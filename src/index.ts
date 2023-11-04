import express, { Application, Request, Response } from "express";
import cors from "cors";
import { pool } from './database'; // ここでデータベース接続関数をインポート

const app: express.Express = express()
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5174" }));

app.get('/', async (req: Request, res: Response) => {
  console.log("getリクエストテスト");
  try {
    const [rows] = await pool.query('SELECT id, title, is_done FROM tasks');
    return res.status(200).json({ todos: rows });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
})

try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}