import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal" );
  const [dueDate, setDueDate] = useState(null);
  const [userCategories, setUserCategories] = useState([]);
  const { user } = useAuth();
  
  // Add fetch categories method
  const fetchCategories = async () => {
    try {
      
      const querySnapshot = await getDocs(
        query(collection(db, "categories"), where("userId", "==", user.uid))
      );

      // Map the documents to an array of tasks
      const categoriesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if(categoriesList.length>0) setCategory(categoriesList[0].category_title)
      setUserCategories(categoriesList);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  //fetch categories on every render
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        category,
        status: "pending",
        dueDate,
        createdAt: Timestamp.now(),
        userId: user.uid,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setCategory("Personal");
     
       // SweetAlert2 Success Message
       Swal.fire({
        position: "center",
        icon: "success",
        title: "Your task has been created",
        showConfirmButton: false,
        timer: 1500
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding task: ", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add task. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h3>

      <form onSubmit={handleSubmit} className="space-y-4 relative">
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
          {/* Map over userCategories and return options */}
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
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
