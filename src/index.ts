import express, { Express } from 'express';

function createServer() {
    const app: Express = express();

    app.use(express.json());

    return app;
}

export default createServer;
