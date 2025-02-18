import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Task } from "../../types";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const { data } = await api.get<Task[]>("/tasks");
      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch tasks: ${err.message}`);
      } else {
        setError("Failed to fetch tasks");
      }
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post<Task>("/tasks", newTask);
      setTasks([...tasks, data]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to create task: ${err.message}`);
      } else {
        setError("Failed to create task");
      }
    }
  };

  const handleUpdateTask = async (id: number, isComplete: boolean) => {
    try {
      await api.put(`/tasks/${id}`, { isComplete });
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, isComplete } : task))
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to update task: ${err.message}`);
      } else {
        setError("Failed to update task");
      }
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to delete task: ${err.message}`);
      } else {
        setError("Failed to delete task");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <h2>My Tasks</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={(e) => handleUpdateTask(task.id, e.target.checked)}
            />
            <div
              className={`task-content ${task.isComplete ? "completed" : ""}`}
            >
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
            </div>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
