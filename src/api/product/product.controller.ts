import { Request, Response } from 'express';
import { createProduct, getAllProducts, searchProducts } from './product.service';
import IProduct from './product.interface';
import logger from '../../utils/logger';
import cloudinary from '../../utils/cloudinary';

type ProductResponse<T> = { err: string } | T;

export const createProductController = async (req: Request<{}, {}, IProduct>, res: Response<ProductResponse<IProduct>>) => {
    const body = req.body;

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
