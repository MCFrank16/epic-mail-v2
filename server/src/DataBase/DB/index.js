import pool from 'pool';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pool({
    connectionString: process.env.DATABASE_URL,
});

export default {
    query: (text,params) => pool.query(text, params),
};