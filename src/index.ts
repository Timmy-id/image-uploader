import express, { Express } from 'express';
import productRoutes from './api/product/product.route';

function createServer() {
    const app: Express = express();

    app.use(express.json());
    app.use('/api/v1/products', productRoutes);

    return app;
}

export default createServer;
