import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { db } from "../firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  //add new task
  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  //delete tasks
  const handleDeleteTask = async (taskId) => {
    const isConfirmed = confirm("Do you want to delete this task?");
    if (!isConfirmed) return; // Exit if the user cancels

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
    querySnapshot.forEach((doc) => {
      console.log({ id: doc.id, ...doc.data() });
    });
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
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Search</h3>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">filter</h3>
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
                      <p className="text-sm text-gray-600">
                        {task.description}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          task.category === "Personal"
                            ? "bg-blue-100 text-blue-800"
                            : task.category === "Work"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {task.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
