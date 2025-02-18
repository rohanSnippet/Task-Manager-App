import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Assuming you have a firebase.js file
import { doc, getDoc, Timestamp, setDoc, getDocs, query, where, collection } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [dueDate, setDueDate] = useState(null);
  const  [userCategories, setUserCategories]= useState([]);
  const [createdAt,setCreatedAt] = useState(null)
  const [status, setStatus] = useState("")
  const {user} = useAuth();

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      const taskDoc = doc(db, "tasks", taskId);
      const taskSnapshot = await getDoc(taskDoc);

      if (taskSnapshot.exists()) {
        const taskData = taskSnapshot.data();

        setTitle(taskData.title);
        setDescription(taskData.description);
        setStatus(taskData.status);
        setCreatedAt(taskData.createdAt);

        // Convert Firestore Timestamp to JavaScript Date object
        const dueDate = taskData.dueDate.toDate();
        setDueDate(dueDate);

        setCategory(taskData.category);
      } else {
        alert("Task not found!");
        navigate("/dashboard"); // Redirect to dashboard if task not found
      }
    };

    fetchTask();
  }, [taskId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
  
    try {
      const taskDoc = doc(db, "tasks", taskId);
      await setDoc(taskDoc, {
        dueDate,
        createdAt,
        status,
        title,
        description,
        category,
        updatedAt: Timestamp.now(),
        userId:user.uid,
      });
  
      Swal.fire({
        icon: "success",
        title: "Task Updated!",
        text: "Your task has been updated successfully.",
        showConfirmButton: false,
        timer: 2000,
      });
  
      navigate("/dashboard"); // Redirect to dashboard after successful update
    } catch (error) {
      console.error("Error updating task: ", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Failed to update task. Please try again.",
      });
    }
  };
  const fetchCategories = async () => {
    try {
      if (!user || !user.uid) return; // Ensure user is loaded before proceeding

      const querySnapshot = await getDocs(
        query(collection(db, "categories"), where("userId", "==", user.uid))
      );
  
      const categoriesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (categoriesList.length > 0) setCategory(categoriesList[0].category_title);
      setUserCategories(categoriesList);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };
  
  // Fetch categories only when the user is available
  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]); 
  
  return (
    <div className="max-w-4xl mx-auto my-12">
      {" "}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Task</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            rows="3"
          ></textarea>
          {/* Add Date Picker in the form */}
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="MMMM d, yyyy" // Date format
            placeholderText="Select a date"
            className="xl:w-[95vh] lg:w-[95vh] md:w-[90vh] sm:w-[70vh] xs:w-[40vh] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            minDate={new Date()}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            {userCategories.map((cat) => (
            <option key={cat.id} value={cat.category_title}>
              {cat.category_title}
            </option>
          ))}
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
