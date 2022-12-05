import { Request, Response, NextFunction } from 'express';

export default function multerErrorHandler(err: Error, _: Request, res: Response, next: NextFunction) {
    if (err) {
        return res.status(400).send({ message: err.message });
    }
    next();
}
