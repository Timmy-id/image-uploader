import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const PORT = env.port || 5000;
export const dbUri = env.DB_URI || '';
export const HOST = env.HOST;
export const CLOUD_NAME = env.CLOUD_NAME;
export const API_KEY = env.API_KEY;
export const API_SECRET = env.API_SECRET;
