import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: express.Express = express()
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5174" }));

app.get('/', (req: Request, res: Response) => {
  console.log("getリクエストテスト");
  return res.status(200).json({ message: "hello world1" });
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