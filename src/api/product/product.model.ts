import mongoose, { Schema } from 'mongoose';
import IProduct from './product.interface';

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, unique: true, required: true },
        description: { type: String },
        gallery: { type: Array, required: true },
        price: { type: Number, required: true, default: 0 },
        stock: { type: Number },
        isAvailable: { type: Boolean }
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
