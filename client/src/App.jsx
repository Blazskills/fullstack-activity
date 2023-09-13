import { useEffect, useRef, useState } from "react";
import './App.css'


function App() {
  const taskRef = useRef();


  const [todos, setTodos] = useState([]);
  const [taskInputValue, setTaskInputValue] = useState("");
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:3000/api/todos");
        

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchTodos();
  }, []);   

  async function handleAddTodoSubmit(event) {
    event.preventDefault();
    try{
        const response = await fetch("http://localhost:3000/api/todos2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: taskInputValue,
            is_completed: false
          }),
        });
        const data = await response.json()

      setTaskInputValue("");
      setTodos((todos) => todos.concat(data));
       } catch (error) {
    
    }
  }

  async function deleteItem(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/todos2/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
  

  return (    
    <div className="max-w-xl mx-auto p-4">
  <h1 className="text-green-500 font-semibold text-4xl mt-4 mb-6">To-do List</h1>
  <form onSubmit={handleAddTodoSubmit} className="mb-4">
    <div className="flex">
      <input
        className="border p-2 flex-1 rounded-l"
        type="text"
        name="task"
        value={taskInputValue}
        onChange={(event) => {
          setTaskInputValue(event.target.value);
        }}
        placeholder="Add a task..."
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
      >
        Add
      </button>
    </div>
  </form>
  <ul className="list-disc p-4">
    {todos.map((todo, i) => (
      <li key={i} className="flex items-center mb-2">
        <input
          type="checkbox"
          className="mr-2 form-checkbox h-5 w-5 text-green-500"
        />
        <span className="flex-1">{todo.task}</span>
        <button
          type="button"
          onClick={() => deleteItem(todo.id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
</div>
  )
}

export default App

