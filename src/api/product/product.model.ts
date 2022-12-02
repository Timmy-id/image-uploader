import mongoose, { Schema } from 'mongoose';
import IProduct from './product.interface';

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, unique: true },
        description: { type: String },
        image: { type: String },
        gallery: { type: Array },
        price: { type: Number },
        stock: { type: Number },
        isAvailable: { type: Boolean }
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
