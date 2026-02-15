import pg from "pg"

import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg

export const pool = new Pool({
    // eslint-disable-next-line no-undef
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
})