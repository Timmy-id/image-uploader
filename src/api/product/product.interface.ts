import { Document } from 'mongoose';

interface IGallery {
    url: string;
    publicId: string;
}

export default interface IProduct extends Document {
    name: string;
    description: string;
    gallery: IGallery[];
    price: number;
    stock?: number;
    isAvailable?: boolean;
}
