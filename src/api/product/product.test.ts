import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../../index';
import { createProduct } from './product.service';

const app = createServer();

const product = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Electric Iron',
    description: 'This is a new product',
    gallery: [
        {
            url: 'https://res.cloudinary.com/timmix95/image/upload/v1670271499/Image-uploader/r2xuf78lrkva1rq9a5bb.png',
            publicId: 'Image-uploader/r2xuf78lrkva1rq9a5bb'
        },
        {
            url: 'https://res.cloudinary.com/timmix95/image/upload/v1670271504/Image-uploader/uy43f78lrkva1rq9arr4.png',
            publicId: 'Image-uploader/uy43f78lrkva1rq9arr4'
        },
        {
            url: 'https://res.cloudinary.com/timmix95/image/upload/v1670271654/Image-uploader/tr75f78lrkva1rq9kl90.png',
            publicId: 'Image-uploader/tr75f78lrkva1rq9kl90'
        }
    ],
    price: 20000,
    stock: 5,
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}

describe('product', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('get product route', () => {
        describe('product does exist', () => {
            it('should return a 200 status and the product', async () => {
                // @ts-ignore
                // const id = '638e520fb83ad97b09a9gh45'
                const newProduct = await createProduct(product)
                
                const {body, status} = await supertest(app).get(`/api/v1/products/${newProduct._id}`)
                expect(status).toBe(200)
                expect(body).toBe(newProduct)
            })
        });
    });
});
