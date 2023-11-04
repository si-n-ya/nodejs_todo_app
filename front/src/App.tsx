import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  is_done?: number;
};

type AddTask = {
  title: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3000")  // ローカルのバックエンドサーバーのURLにgetメソッドでアクセス
      .then((response) => {
        console.log(response.data.tasks);
        const { tasks } = response.data;
        setTasks(tasks);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const addTask = async (title: string) => {
    if (!title) {
      alert('TODOを入力してください。')
      return;
    }
    console.log(title);
    await axios
      .post<AddTask>(
        "http://localhost:3000/add",
        { title: title },
      )
      .then((response) => {
        // APIから返されるデータをTask型を想定しているため、型アサーションを使用してdataをTask型にキャストする
        const data = response.data as Task;
        console.log(data)
        setTasks((preTasks) => [data, ...preTasks]);
        setTitle('')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title)
    addTask(title)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="TODOを入力してください。"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  
        />
        <button type="submit">add</button>
      </form>
      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
    </>
  );
}

export default App
