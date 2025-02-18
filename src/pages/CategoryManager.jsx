import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, getDocs, doc, deleteDoc, Timestamp, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";

const CategoryManager = () => {
  const [category, setCategory] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, [user.uid]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!category.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Category Required!",
        text: "Please enter a category name before submitting.",
      });
      return;
    }
  
    const newCategory = {
      category_title: category.trim(),
      categoryDesc: categoryDesc.trim(),
      createdAt: Timestamp.now(),
      userId: user.uid,
    };
  
    try {
      await addDoc(collection(db, "categories"), newCategory);
  
      setCategory("");
      setCategoryDesc("");
  
      Swal.fire({
        icon: "success",
        title: "Category Added!",
        text: "Your new category has been successfully added.",
        showConfirmButton: false,
        timer: 2000,
      });
  
      fetchCategories(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding category: ", error);
      
      Swal.fire({
        icon: "error",
        title: "Failed to Add Category!",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "categories", id));
  
          Swal.fire({
            icon: "success",
            title: "Category Deleted!",
            text: "The category has been successfully deleted.",
            showConfirmButton: false,
            timer: 2000,
          });
  
          fetchCategories(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting category: ", error);
  
          Swal.fire({
            icon: "error",
            title: "Failed to Delete!",
            text: "Something went wrong. Please try again later.",
          });
        }
      }
    });
  };
  
  return (
   <div className="max-w-5xl mx-auto mt-20"> <div className="bg-white p-6 rounded-lg shadow-md mb-8">
   <h3 className="text-xl font-semibold mb-4 text-gray-800">
     Add New Category
   </h3>
   <form onSubmit={handleSubmit} className="space-y-4 relative">
     <input
       type="text"
       placeholder="Category Title"
       value={category}
       onChange={(e) => setCategory(e.target.value)}
       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       required
     />
     <textarea
       placeholder="Category Description"
       value={categoryDesc}
       onChange={(e) => setCategoryDesc(e.target.value)}
       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       rows="3"
     ></textarea>
     <button
       type="submit"
       className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
     >
       Add Category
     </button>
   </form>

   <div className="mt-8">
     <h3 className="text-xl font-semibold mb-4 text-gray-800">Categories</h3>
     {categories.map((cat) => (
       <div key={cat.id} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center">
         <div>
           <h4 className="text-lg font-medium text-gray-700">{cat.category_title}</h4>
           <p className="text-sm text-gray-500">{cat.categoryDesc}</p>
         </div>
         <button
           onClick={() => handleDelete(cat.id)}
           className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
         >
           Delete
         </button>
       </div>
     ))}
   </div>
 </div></div>
  );
};

export default CategoryManager;