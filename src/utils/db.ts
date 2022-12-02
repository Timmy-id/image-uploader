import { dbUri, PORT, HOST } from './config';

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

export default db;
