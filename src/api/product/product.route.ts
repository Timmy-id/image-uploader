import express from 'express';
import { createProductController, getAllProductsController, searchProductsController, getSingleProductController, deleteProductController } from './product.controller';
import upload from '../../utils/multer';
import multerErrorHandler from '../../middleware/multerMiddleware';

const router = express.Router();

router.post('/', [upload.array('gallery', 3), multerErrorHandler], createProductController);
router.get('/', getAllProductsController);
router.get('/:id', getSingleProductController);
router.post('/search', searchProductsController);
router.delete('/:id', deleteProductController);

export default router;
