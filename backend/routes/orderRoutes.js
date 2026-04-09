import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { orderItems, paymentMethod, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            paymentMethod,
            totalPrice,
            isPaid: true, // Assuming instant payment confirmation for now
            paidAt: Date.now()
        });

        const createdOrder = await order.save();

        // Update user's purchased items
        const user = await User.findById(req.user._id);
        
        for (const item of orderItems) {
            // Can add more complex logic to differentiate PDF vs Course here based on item.product details
            // For now pushing to all as demonstration
            user.purchasedCourses.push(item.product);
            user.purchasedPDFs.push(item.product);
        }
        await user.save();

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await Order.deleteOne({ _id: req.params.id });
            res.json({ message: 'Order removed' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
