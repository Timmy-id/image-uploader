import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../../index';
import { createProduct } from './product.service';

const app = createServer();

const noRequiredFieldsProduct = {
    name: '',
    description: 'I am for empty product',
    gallery: [
        {
            url: '',
            publicId: ''
        },
        {
            url: '',
            publicId: ''
        },
        {
            url: '',
            publicId: ''
        }
    ],
    price: 0
};

const product = {
    // _id: new mongoose.Types.ObjectId().toString(),
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
    isAvailable: true
};

const product_one = {
    // _id: new mongoose.Types.ObjectId().toString(),
    name: 'Iron',
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
    isAvailable: true
};

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
        // describe('product does exist', () => {
        //     it('should return a 200 status and the product', async () => {
        //         // @ts-ignore
        //         // const id = '638e520fb83ad97b09a9gh45'
        //         const newProduct = await createProduct(product)

        //         const {body, status} = await supertest(app).get(`/api/v1/products/${newProduct._id}`)
        //         expect(status).toBe(200)
        //         expect(body).toBe(newProduct)
        //     })
        // });
        describe('given the required fields are missing', () => {
            it('should return 400 error', async () => {
                // @ts-ignore
                // const newProduct = await createProduct(noRequiredFieldsProduct);
                const { statusCode } = await supertest(app).post('/api/v1/products').send(noRequiredFieldsProduct);
                expect(statusCode).toBe(400)
            });
        });

        describe('given the products array is empty', () => {
            it('should return an empty array and 200', async () => {
                // @ts-ignore
                const { body, statusCode } = await supertest(app).get('/api/v1/products');
                expect(statusCode).toBe(200)
                expect(body).toEqual([])
            });
        });

        describe('given the required inputs', () => {
            it('should return the product object and 200', async () => {
                
                // @ts-ignore
                const newProduct = await createProduct(product)
                const { body, statusCode } = await supertest(app).get('/api/v1/products');
                expect(statusCode).toBe(200)
                expect(body).toEqual([{
                    _id: expect.any(String),
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
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    __v: 0
                }])
            });
        });

        describe('given the product id, return the product', () => {
            it('should return a 200 and the product', async () => {
                // @ts-ignore
                const newProduct = await createProduct(product_one)
                const {statusCode} = await supertest(app).get(`/api/v1/products/${newProduct._id}`)
                expect(statusCode).toBe(200)
            })
        })
    });
});
