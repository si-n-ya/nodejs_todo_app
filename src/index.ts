import express, { Application, Request, Response } from "express";
import cors from "cors";
import { pool } from './database';

// TODO バリデーション
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

app.post("/add", async (req: Request, res: Response) => {
  console.log("task追加リクエスト");
  console.log(req.body);
  const { title } = req.body;

  try {
    const sql = `INSERT INTO tasks (title) VALUES (?)`;
    const [result] = await pool.query(sql, [title]);
    const insertId = (result as any).insertId;
    return res.status(200).json({ id: insertId, title: title });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ message: "タスクの登録に失敗しました。" });
    } else {
      // 想定外のエラー
      return res.status(500).json({ message: "想定外のエラーが発生しました。" });
    }
  }
})

app.put("/update", async (req: Request, res: Response) => {
  console.log("putリクエスト");
  console.log(req.body);
  const { id, title } = req.body;

  try {
    const sql = `UPDATE tasks SET title=? WHERE id=?`
    const [result] = await pool.query(sql, [title, id]);
    return res.status(200).json({ id: id, title: title });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ message: "タスクの更新に失敗しました。" });
    } else {
      // 想定外のエラー
      return res.status(500).json({ message: "想定外のエラーが発生しました。" });
    }
  }
});

app.delete("/delete", async (req: Request, res: Response) => {
  console.log("deleteリクエスト");
  console.log(req.body.id);
  const { id } = req.body;

  try {
    const sql = `DELETE FROM tasks WHERE id=?`
    const [result] = await pool.query(sql, [id]);
    return res.status(200).json({ id: id });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ message: "タスクの削除に失敗しました。" });
    } else {
      // 想定外のエラー
      return res.status(500).json({ message: "想定外のエラーが発生しました。" });
    }
  }
});

try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}