import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectToDatabase } from './database'; // ここでデータベース接続関数をインポート

const app: express.Express = express()
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5174" }));

app.get('/', (req: Request, res: Response) => {
  console.log("getリクエストテスト");
  const connection = connectToDatabase();

  const sql = "SELECT id, title, is_done FROM tasks";
  connection.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(200).json({ todos: result });
    }
  });
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