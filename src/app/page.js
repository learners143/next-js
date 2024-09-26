'use client';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [showActive, setShowActive] = useState(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

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

  const handleEditTask = (index) => {
    setInput(tasks[index].name);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-10 px-5">
      <div className="max-w-xl w-full bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Responsive To-Do List
        </h1>

        {}
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow border border-gray-600 p-3 rounded-l-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-3 rounded-r-lg transition-colors duration-300 flex items-center justify-center"
          >
            <AiOutlinePlus size={24} />
          </button>
        </div>

        {}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${
              showActive ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'
            }`}
            onClick={() => setShowActive(true)}
          >
            Active Tasks
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${
              !showActive ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'
            }`}
            onClick={() => setShowActive(false)}
          >
            Completed Tasks
          </button>
        </div>

        {}
        <ul className="space-y-3">
          {showActive ? (
            activeTasks.length > 0 ? (
              activeTasks.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-lg bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <span
                    onClick={() => handleToggleComplete(index)}
                    className="cursor-pointer flex-grow text-left text-white"
                  >
                    {task.name}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleComplete(index)}
                      className="text-green-400 hover:text-green-500 transition-colors duration-300"
                    >
                      <FiCircle size={24} />
                    </button>

                    <button
                      onClick={() => handleEditTask(index)}
                      className="text-yellow-400 hover:text-yellow-500 transition-colors duration-300"
                    >
                      <AiOutlineEdit size={24} />
                    </button>

                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="text-red-400 hover:text-red-500 transition-colors duration-300"
                    >
                      <AiOutlineDelete size={24} />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-400">No active tasks!</li>
            )
          ) : completedTasks.length > 0 ? (
            completedTasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg bg-green-800 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span
                  onClick={() => handleToggleComplete(index)}
                  className="cursor-pointer flex-grow text-left line-through text-gray-400"
                >
                  {task.name}
                </span>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleComplete(index)}
                    className="text-green-400 hover:text-green-500 transition-colors duration-300"
                  >
                    <FiCheckCircle size={24} />
                  </button>

                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="text-red-400 hover:text-red-500 transition-colors duration-300"
                  >
                    <AiOutlineDelete size={24} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-400">No completed tasks!</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
