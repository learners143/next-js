"use client";
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [showActive, setShowActive] = useState(true); // Toggle between Active and Completed
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedTask, setSelectedTask] = useState(null); // For task details in the modal

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Store tasks in localStorage on task state change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!inputTitle || !inputDescription) return;
    if (editIndex >= 0) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex
          ? { ...task, title: inputTitle, description: inputDescription }
          : task
      );
      setTasks(updatedTasks);
      setEditIndex(-1);
    } else {
      setTasks([
        ...tasks,
        { title: inputTitle, description: inputDescription, completed: false },
      ]);
    }
    setInputTitle('');
    setInputDescription('');
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setInputTitle(task.title);
    setInputDescription(task.description);
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

  const openTaskDetails = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-10 px-5">
      <div className="max-w-xl w-full bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Responsive To-Do List</h1>

        {/* Input and Add Button */}
        <div className="flex mb-4 space-y-2 flex-col md:flex-row">
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            className="flex-grow border border-gray-600 p-3 rounded-l-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400 mb-2 md:mb-0"
            placeholder="Task Title"
          />
          <input
            type="text"
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
            className="flex-grow border border-gray-600 p-3 bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400 mb-2 md:mb-0"
            placeholder="Task Description"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <AiOutlinePlus size={24} />
          </button>
        </div>

        {/* Toggle Buttons for Active and Completed Tasks */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${showActive ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'}`}
            onClick={() => setShowActive(true)}
          >
            Active Tasks
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${!showActive ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'}`}
            onClick={() => setShowActive(false)}
          >
            Completed Tasks
          </button>
        </div>

        {/* Task List with Animation between Active and Completed */}
        <AnimatePresence exitBeforeEnter>
          {showActive ? (
            <motion.div
              key="active-tasks"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {activeTasks.length > 0 ? (
                activeTasks.map((task, index) => (
                  <motion.li
                    key={index}
                    className="flex justify-between items-center p-4 border rounded-lg bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 mb-3"
                    onClick={() => openTaskDetails(task)}
                  >
                    <span className="cursor-pointer text-left text-white">{task.title}</span>
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
                  </motion.li>
                ))
              ) : (
                <li className="text-center text-gray-400">No active tasks!</li>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="completed-tasks"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {completedTasks.length > 0 ? (
                completedTasks.map((task, index) => (
                  <motion.li
                    key={index}
                    className="flex justify-between items-center p-4 border rounded-lg bg-green-800 shadow-sm hover:shadow-md transition-shadow duration-300 mb-3"
                    onClick={() => openTaskDetails(task)}
                  >
                    <span className="cursor-pointer text-left text-white">{task.title}</span>
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
                  </motion.li>
                ))
              ) : (
                <li className="text-center text-gray-400">No completed tasks!</li>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal for Task Details */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md text-white"
            >
              <h2 className="text-2xl font-semibold mb-4">{selectedTask?.title}</h2>
              <p>{selectedTask?.description}</p>
              <button
                onClick={closeModal}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
