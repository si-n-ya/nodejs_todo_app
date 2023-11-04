import express, { Application, Request, Response } from "express";
import cors from "cors";
import { pool } from './database';

const app: express.Express = express()
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5174" }));
// フロントから送られてきたjsonデータをバックエンドで利用できるようにする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  console.log("getリクエストテスト");
  try {
    const [rows] = await pool.query('SELECT id, title, is_done FROM tasks');
    return res.status(200).json({ tasks: rows });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
})

app.post("/add", (req: Request, res: Response) => {
  console.log("task追加リクエスト");
  console.log(req.body);
  const { title } = req.body;
  return res.status(200).json({ title: title });
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