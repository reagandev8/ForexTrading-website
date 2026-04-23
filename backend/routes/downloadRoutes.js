import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Secure download route for purchased products
// @route   GET /api/download/:productId
// @access  Private
router.get('/:productId', protect, async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user._id);
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user has purchased the product
        const hasPurchasedPDF = user.purchasedPDFs.some(id => id.toString() === productId);
        const hasPurchasedCourse = user.purchasedCourses.some(id => id.toString() === productId);

        if (!hasPurchasedPDF && !hasPurchasedCourse && user.role !== 'admin') {
            return res.status(403).json({ message: 'You have not purchased this product.' });
        }

        // Ideally, generate a signed URL or stream the file
        // For this scenario, we'll return the file URL ensuring it's kept secure by only giving it to authorized users.
        if (!product.fileUrl) {
            return res.status(404).json({ message: 'File not available for this product yet.' });
        }

        res.json({ fileUrl: product.fileUrl });
    } catch (error) {
        console.error("Download Error: ", error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
