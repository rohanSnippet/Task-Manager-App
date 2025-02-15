import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Assuming you have a firebase.js file
import { doc, getDoc, Timestamp, setDoc } from 'firebase/firestore';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");


  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      const taskDoc = doc(db, "tasks", taskId);
      const taskSnapshot = await getDoc(taskDoc);
      console.log(taskSnapshot)
      if (taskSnapshot.exists()) {
        const taskData = taskSnapshot.data();
   
        setTitle(taskData.title);
        setDescription(taskData.description);
        setCategory(taskData.category);
      } else {
        alert("Task not found!");
        navigate('/dashboard'); // Redirect to dashboard if task not found
      }
    };

    fetchTask();
  }, []);
 
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
      });
      alert("Task updated successfully!"); // Notify user of success
      navigate('/dashboard'); // Redirect to dashboard after successful update
    } catch (error) {
      console.error("Error updating task: ", error);
      alert("Failed to update task. Please try again."); // Notify user of error
    }
  };

  return (
   <div className='max-w-4xl mx-auto my-12'> <div className="bg-white p-6 rounded-lg shadow-md mb-8">
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
     <select
       value={category}
       onChange={(e) => setCategory(e.target.value)}
       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
     >
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
 </div></div>
  );
};

export default EditTask;