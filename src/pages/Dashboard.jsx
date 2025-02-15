import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { db } from "../firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  //add new task
  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  //delete tasks
  const handleDeleteTask = async (taskId) => {
    const isConfirmed = confirm("Do you want to delete this task?");
    if (!isConfirmed) return;

    try {

      await deleteDoc(doc(db, "tasks", taskId));
      console.log("Task deleted successfully!");
      getAllTasks();
    } catch (error) {
      console.error("Error deleting task: ", error);
      alert("An error occurred while deleting the task. Please try again.");
    }
  };

  //get all tasks
  const getAllTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasks);
  };

  useEffect(() => {
    getAllTasks();
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Task Manager Dashboard
        </h2>
        <AddTask onAddTask={handleAddTask} />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Your Tasks
            </h3>
          </div>
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks found. Add a new task!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 my-3">
                        {task.description}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 mr-3 text-xs font-semibold rounded-full ${task.category === "Personal"
                          ? "bg-blue-100 text-blue-800"
                          : task.category === "Work"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                          }`}
                      >
                        {task.category}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${task.status === "pending"
                          ? "bg-amber-300 text-yellow-900"
                          : task.category === "Work"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                          }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <div className="flex gap-x-8">
                      <button
                        onClick={() => navigate(`/edit/${task.id}`)}
                        className="text-indigo-600 hover:bg-indigo-200 rounded-full p-2 hover:text-indigo-800 focus:outline-none cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:bg-red-200 p-2 rounded-full hover:text-red-800 focus:outline-none cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>))}
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
