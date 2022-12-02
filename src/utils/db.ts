import mongoose from 'mongoose';
import { dbUri, PORT, HOST } from './config';
import logger from '../utils/logger';

const db = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepAlive: true,
            autoIndex: false,
            retryWrites: false
        },
        url: dbUri
    },
    server: {
        host: HOST,
        port: PORT
    }
};

const database = () => {
    mongoose
        .connect(db.mongo.url, db.mongo.options)
        .then(() => {
            logger.info('Connected to Database');
        })
        .catch((err) => {
            logger.error(err.message);
        });
};

export default database;
