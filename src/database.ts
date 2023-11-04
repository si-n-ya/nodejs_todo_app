import mysql from 'mysql2';

export const connectToDatabase = () => {
  require('dotenv').config();
  const env = process.env
  return mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
  });
};
