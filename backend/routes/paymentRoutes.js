import express from 'express';
import dotenv from 'dotenv';
import { protect } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();
const router = express.Router();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://api-m.paypal.com' 
    : (process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com');

const getAccessToken = async () => {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64');
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${auth}`
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error_description || 'Failed to get PayPal access token');
    }
    return data.access_token;
};

const createOrder = async (amount) => {
    const accessToken = await getAccessToken();
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: amount.toFixed(2)
                    }
                }
            ]
        })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to create PayPal order');
    }
    return data;
};

const captureOrder = async (orderId) => {
    const accessToken = await getAccessToken();
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to capture PayPal order');
    }
    return data;
};

// @desc    Create PayPal order
// @route   POST /api/payments/create-order
// @access  Private
router.post('/create-order', protect, async (req, res) => {
    try {
        const { orderItems } = req.body;
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }
        
        // Calculate amount accurately on backend
        let totalAmount = 0;
        for (const item of orderItems) {
            if (item.product === 'vip' || item.name === 'VIP Monthly Pass') {
                totalAmount += 70 * item.qty;
            } else {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(404).json({ message: `Product not found: ${item.name}` });
                }
                totalAmount += product.price * item.qty;
            }
        }

        const order = await createOrder(totalAmount);
        res.json({ id: order.id });
    } catch (error) {
        console.error("PayPal Create Order Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Capture PayPal order
// @route   POST /api/payments/capture-order
// @access  Private
router.post('/capture-order', protect, async (req, res) => {
    try {
        const { orderId, orderItems, totalPrice } = req.body;
        const captureData = await captureOrder(orderId);

        if (captureData.status === 'COMPLETED') {
            const order = new Order({
                user: req.user._id,
                orderItems,
                paymentMethod: 'PayPal',
                paymentResult: {
                    id: captureData.id,
                    status: captureData.status,
                    update_time: captureData.update_time,
                    email_address: captureData.payment_source?.paypal?.email_address || 'unknown'
                },
                totalPrice: totalPrice,
                isPaid: true,
                paidAt: Date.now()
            });

            const createdOrder = await order.save();

            const user = await User.findById(req.user._id);
            for (const item of orderItems) {
                if (item.product === 'vip' || item.name === 'VIP Monthly Pass') {
                    user.isVIP = true;
                    const expiry = new Date();
                    expiry.setMonth(expiry.getMonth() + 1);
                    user.vipExpiry = expiry;
                } else {
                    const product = await Product.findById(item.product);
                    if (product) {
                        if (product.type === 'pdf') {
                            user.purchasedPDFs.push(product._id);
                        } else if (product.type === 'course') {
                            user.purchasedCourses.push(product._id);
                        } else {
                            user.purchasedPDFs.push(product._id);
                        }
                    }
                }
            }
            await user.save();

            res.json(createdOrder);
        } else {
            res.status(400).json({ message: `Payment not completed. Status: ${captureData.status}` });
        }
    } catch (error) {
        console.error("PayPal Capture Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get paypal client id
// @route   GET /api/payments/config/paypal
// @access  Public
router.get('/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' });
});

export default router;
