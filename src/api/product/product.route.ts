import express from 'express';
import { createProductController } from './product.controller';

const router = express.Router();

router.post('/', createProductController);

export default router;
