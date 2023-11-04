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
  const [editId, setEditId] = useState<number|undefined>(undefined);
  const [editTitle, setEditTitle] = useState<string|undefined>(undefined);

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

  const addTask = async () => {
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

  const updateTask = async () => {
    if (!editTitle) {
      alert('編集用TODOを入力してください。')
      return;
    }
    await axios
      .put<Task>(
        "http://localhost:3000/update",
        {
          id: editId,
          title: editTitle,
        })
      .then((response) => {
        console.log(response.data);
        const data = response.data as Task;
        const newTasks: Task[] = tasks.map((task) => {
          return task.id === data.id ? data : task;
        });
        setTasks(newTasks);
        setEditId(undefined);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title)
    addTask()
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(editTitle)
    updateTask()
  }

  const handleToggleEdit = (e: React.MouseEvent<HTMLButtonElement>, task: Task) => {
    setEditId(task.id)
    setEditTitle(task.title)
  }

  return (
    <>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          placeholder="TODOを入力してください。"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  
        />
        <button type="submit">add</button>
      </form>
      {tasks.map((task) => (
        <div key={task.id} style={{ display: "flex" }}>
          {editId === task.id ? (
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                placeholder="TODOを入力してください。"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}  
              />
              <button>update</button>
            </form>
          ) : (
            <>
              <p>{task.title}</p>
              <button
                onClick={(e) => handleToggleEdit(e, task)}
              >
              edit
              </button>
            </>
          )}

          <button onClick={() => console.log('delete')}>delete</button>
        </div>
      ))}
    </>
  );
}

export default App
