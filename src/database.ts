import mysql from 'mysql2/promise';

require('dotenv').config();
const env = process.env
export const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
});
