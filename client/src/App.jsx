import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // const fetchTodos = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:3000");
    //     setTodos(response.data);
    //   } catch (error) {
    //     console.error("Error while fetching todos:", error);
    //   }
    // }


    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
            <p>{todo.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
