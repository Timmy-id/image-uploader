import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const PORT = env.port || 5000;
export const dbUri = env.DB_URI || '';
export const HOST = env.HOST;
