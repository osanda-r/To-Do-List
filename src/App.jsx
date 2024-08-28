import { useState, useEffect } from "react";
import clsx from "clsx";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false, editing: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText, editing: false } : task
    );
    setTasks(updatedTasks);
  };

  const toggleEditTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, editing: !task.editing } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="container">
      <div className="header">
        <h1>To-Do List</h1>
      </div>
      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="task-input"
        />
        <button onClick={addTask} className="add-task">
          Add
        </button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={clsx("task-item", { completed: task.completed })}
          >
            {task.editing ? (
              <input
                className="edit-input"
                type="text"
                value={task.text}
                onChange={(e) => editTask(index, e.target.value)}
              />
            ) : (
              <span onClick={() => toggleCompleteTask(index)}>{task.text}</span>
            )}
            <div>
              <button
                onClick={() => toggleEditTask(index)}
                className="edit-task"
              >
                {task.editing ? "Save" : "Edit"}
              </button>
              <button onClick={() => deleteTask(index)} className="delete-task">
                Delete
              </button>
              {!task.editing && (
                <button
                  onClick={() => toggleCompleteTask(index)}
                  className="complete-task"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="filters">
        <button
          className={clsx({ active: filter === "all" })}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={clsx({ active: filter === "active" })}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={clsx({ active: filter === "completed" })}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default App;
