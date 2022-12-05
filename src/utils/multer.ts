import { Request } from 'express';
import multer from 'multer';

type FileNameCallback = (error: Error | null, filename: string) => void;
type FileFilterCallback = (error: any, file: boolean) => void;

const storage = multer.diskStorage({
    filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
        callback(null, file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;
