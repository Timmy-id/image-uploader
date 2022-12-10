import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { createProduct, getAllProducts, searchProducts, getSingleProduct, deleteProduct } from './product.service';
import IProduct from './product.interface';
import logger from '../../utils/logger';
import cloudinary from '../../utils/cloudinary';

type ProductResponse<T> = { err: string } | T;

export const createProductController = async (req: Request<{}, {}, IProduct>, res: Response<ProductResponse<IProduct>>) => {
    const body = req.body;
    if (!body.name || body.price) {
        return res.status(400).json({ err: 'Enter the required fields' });
    }

    body.gallery = [];

    try {
        const files = req.files as Express.Multer.File[];
        for (const file of files) {
            const images = cloudinary.uploader.upload(file.path, {
                folder: 'Image-uploader'
            });
            const data = await images;
            body.gallery.push({
                url: data.secure_url,
                publicId: data.public_id
            });
        }

        if (body.gallery.length === 0) {
            return res.status(400).json({ err: 'Gallery fields are required' });
        }

        const product = await createProduct(body);
        return res.status(201).json(product);
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ err: 'Something bad occurred' });
    }
};

export const getAllProductsController = async (_: Request, res: Response<ProductResponse<IProduct[]>>) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ err: 'Something bad occurred' });
    }
};

export const getSingleProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ err: 'Invalid product ID' });
    }

    try {
        const product = await getSingleProduct(id);
        if (!product) {
            return res.status(404).json({ err: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ err: 'Something bad occurred' });
    }
};

export const searchProductsController = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const products = await searchProducts(name);

        if (products.length === 0) {
            return res.status(404).json({ err: `No product was found with name ${name}` });
        }
        return res.status(200).json(products);
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ err: 'Something bad occurred' });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ err: 'Invalid product ID' });
    }
    try {
        const product = await getSingleProduct(id);
        if (!product) {
            return res.status(404).json({ err: 'Product not found' });
        }
        const imgIds = product.gallery.map((img) => img.publicId);
        if (imgIds.length > 0) {
            imgIds.forEach(async (imgId) => {
                await cloudinary.uploader.destroy(imgId);
            });
        }
        await deleteProduct(id);
        return res.status(204).json({});
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ err: 'Something bad occurred' });
    }
};
