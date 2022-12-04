import express from 'express';
import { createProductController, getAllProductsController } from './product.controller';

const router = express.Router();

router.post('/', createProductController);
router.get('/', getAllProductsController);

export default router;
