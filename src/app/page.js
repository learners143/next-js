// pages/index.js
"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Store tasks in localStorage on task state change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle adding or updating a task
  const handleAddTask = () => {
    if (!input) return;

    if (editIndex >= 0) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { ...task, name: input } : task
      );
      setTasks(updatedTasks);
      setEditIndex(-1);
    } else {
      setTasks([...tasks, { name: input, completed: false }]);
    }
    setInput('');
  };

  // Handle editing a task
  const handleEditTask = (index) => {
    setInput(tasks[index].name);
    setEditIndex(index);
  };

  // Handle marking a task as completed or incomplete
  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-5">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Responsive To-Do List</h1>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 p-3 rounded-l-lg text-gray-700 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
          >
            {editIndex >= 0 ? 'Update' : 'Add'}
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-4 border rounded-lg ${
                  task.completed ? 'bg-green-100' : 'bg-white'
                } shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <span
                  onClick={() => handleToggleComplete(index)}
                  className={`cursor-pointer flex-grow text-left ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-700'
                  }`}
                >
                  {task.name}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTask(index)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No tasks yet! Add a task to get started.</li>
          )}
        </ul>
      </div>
    </div>
  );
};
