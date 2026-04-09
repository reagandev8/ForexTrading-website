import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ['pdf', 'course'], required: true },
    fileUrl: { type: String }, // For PDF or main video URL
    imageUrl: { type: String }, // Cover image
    sections: [
        {
            title: String,
            videoUrl: String,
            content: String
        }
    ] // For courses
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
