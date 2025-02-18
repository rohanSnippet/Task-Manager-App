import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  // Add sortOption state
  const [sortOption, setSortOption] = useState("dueDate"); // Default sorting

  const { user } = useAuth();

  //add new task
  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  //delete tasks
  const handleDeleteTask = async (taskId) => {
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (!result.isConfirmed) return; // Stop if user cancels
  
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      // Show success message
      Swal.fire({
        title: "Deleted!",
        text: "Your task has been successfully deleted.",
        icon: "success",
        timer: 2000, // Auto-close after 2 seconds
        showConfirmButton: false,
      });
  
      // Refresh the task list
      getTasksForUser(user.uid);
  
    } catch (error) {
      console.error("Error deleting task: ", error);
  
      // Show error message
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the task. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Fetch tasks related to a specific user
  const getTasksForUser = async (userId) => {
    try {
      // Query tasks where the 'userId' field matches the provided userId
      const querySnapshot = await getDocs(
        query(collection(db, "tasks"), where("userId", "==", userId))
      );
      // Map the documents to an array of tasks
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilteredTasks(tasks);
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks for user: ", error);
    }
  };

  const fetchCategories = async () => {
    try {
      // Query tasks where the 'userId' field matches the provided userId
      const querySnapshot = await getDocs(
        query(collection(db, "categories"), where("userId", "==", user.uid))
      );

      // Map the documents to an array of tasks
      const categoriesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    getTasksForUser(user.uid);
  }, [user]);

  const handleFilterChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedFilterCategory(selectedCategory);

    if (selectedCategory === "All") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) => task.category == selectedCategory
      );
      setFilteredTasks(filtered);
    }
  };

  // Implement sorting logic
  const sortTasks = (tasks, option) => {
    if (option === "newest") {
      return [...tasks].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds); // Newest first
    } else if (option === "oldest") {
      return [...tasks].sort((a, b) => a.createdAt.seconds - b.createdAt.seconds); // Oldest first
    } else if (option === "dueDate") {
      return [...tasks].sort((a, b) => a.dueDate.seconds - b.dueDate.seconds);
    }
    return tasks;
  };
  
//useEffect to apply sorting dynamically.
  useEffect(() => {
    const sortedTasks = sortTasks([...tasks], sortOption);
    setFilteredTasks(sortedTasks);
  }, [tasks, sortOption]);


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Task Manager Dashboard
        </h2>

        {/* Create new category button in Dashboard.jsx*/}
        <button
          className="cursor-pointer py-2 my-2 px-2 bg-slate-200 rounded-lg font-medium"
          type="button"
          onClick={() => navigate("/category")}
        >
          Create New Category
        </button>

        <AddTask onAddTask={handleAddTask} />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Your Tasks
            </h3>

            <div className="mt-8 flex gap-x-2">

              {/* Add Sorting UI */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="dueDate">Due Date</option>
                <option value="oldest">Oldest</option>
                <option value="newest">Newest</option>
              </select>

              <select
                value={selectedFilterCategory}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="All">All</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.category_title}>
                    {cat.category_title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks found. Add a new task!</p>
          ) : (
            <div className="space-y-4 mt-4">
              {filteredTasks.map((task) => {
                // convert the due date from seconds to Date format.
                const dueDate = new Date(task.dueDate.seconds * 1000);
                const formattedDueDate = dueDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const now = new Date();
                const timeLeft = (dueDate - now) / (1000 * 60 * 60);
                const dueDateColor =
                  timeLeft < 24
                    ? "bg-red-600/50"
                    : timeLeft < 48
                    ? "bg-orange-600/50"
                    : "bg-green-500 ";

                return (
                  <div
                    key={task.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-medium text-gray-800">
                          {task.title}
                          {/* Add a new span to display the due date */}
                          <span
                            className={`${dueDateColor} p-1 text-xs font-semibold rounded-full ml-6 text-white`}
                          >
                            <span className="bg-white text-black rounded-full px-1 mr-1 font-bold">
                              Due Date{" "}
                            </span>
                            {formattedDueDate}
                          </span>
                        </h4>
                        <p className="text-sm text-gray-600 my-3">
                          {task.description}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 mr-3 text-xs font-semibold rounded-full ${
                            task.category === "Personal"
                              ? "bg-blue-100 text-blue-800"
                              : task.category === "Work"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {task.category}
                        </span>
                        <span
                          className={`inline-block px-2 py-1 mr-3 text-xs font-semibold rounded-full ${
                            task.status === "pending"
                              ? "bg-amber-300 text-yellow-900"
                              : task.status === "done"
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                          >
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
