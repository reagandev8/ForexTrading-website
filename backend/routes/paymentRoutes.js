import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { protect } from '../middleware/authMiddleware.js';

dotenv.config();

const router = express.Router();
let stripe;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_mockkey_please_replace') {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}
// @desc    Create Stripe checkout session
// @route   POST /api/payments/create-checkout-session
// @access  Private
router.post('/create-checkout-session', protect, async (req, res) => {
    try {
        const { orderItems } = req.body;

        const line_items = orderItems.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // Stripe expects amounts in cents
                },
                quantity: item.qty,
            };
        });

        // If no real stripe key is configured, bypass and mock a successful response.
        if (!stripe) {
            console.log("Mocking Stripe Checkout Session because no real Secret Key was provided.");
            return res.json({ id: 'cs_test_mock123UIO', url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?success=true` });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?success=true`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart?canceled=true`,
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error("Stripe Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Initiate M-Pesa STK Push
// @route   POST /api/payments/mpesa/stkpush
// @access  Private
router.post('/mpesa/stkpush', protect, async (req, res) => {
    try {
        const { phone, amount, orderItems } = req.body;
        // In a real scenario, you'd use Safaricom's Daraja API here:
        // 1. Generate OAuth Token
        // 2. Format phone number (e.g. 254...)
        // 3. Make POST request to Daraja STK Push trigger endpoint
        
        console.log(`Simulating M-Pesa STK push for ${phone} - Ksh ${amount}`);
        
        // Mock successful initiation response from Daraja
        res.json({
            MerchantRequestID: "12345-MOCK-REQ",
            CheckoutRequestID: "ws_CO_MOCK_XYZ",
            ResponseCode: "0",
            ResponseDescription: "Success. Request accepted for processing",
            CustomerMessage: "Success. Request accepted for processing"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
