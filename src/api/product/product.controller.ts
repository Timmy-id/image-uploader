import { Request, Response } from 'express';
import { createProduct, getAllProducts } from './product.service';
import IProduct from './product.interface';
import logger from '../../utils/logger';

type ProductResponse<T> = { err: string } | { data: T };

export const createProductController = async (req: Request<{}, {}, IProduct>, res: Response<ProductResponse<IProduct>>) => {
    const body = req.body;

    try {
        const product = await createProduct(body);
        return res.status(201).json({ data: product });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ err: 'Something bad occurred' });
    }
};

export const getAllProductsController = async (_: Request, res: Response<ProductResponse<IProduct[]>>) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json({ data: products });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ err: 'Something bad occurred' });
    }
};
