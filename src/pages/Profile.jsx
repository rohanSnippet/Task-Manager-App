import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, auth } = useAuth(); // Ensure `auth` is available for updateProfile
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    phoneNumber: "",
    photoURL: "",
  });

  const [error, setError] = useState(null);

  // Prefill values when user is available
  useEffect(() => {
    if (user) {
      setUserDetails({
        displayName: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        photoURL: user.photoURL || "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=", // Default image
      });
    }
  }, [user]); // Runs only when `user` changes
console.log(user)
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await updateProfile(auth.currentUser, {
        displayName: userDetails.displayName,
        photoURL: userDetails.photoURL,
      });

      console.log("Profile Updated Successfully:", userDetails);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Profile Settings</h3>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4 w-full items-center">
              
              {/* Input Section */}
              <div className="w-4/6 space-y-4">
                <input
                  type="text"
                  name="displayName"
                  placeholder="Your Name"
                  value={userDetails.displayName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />

              </div>

              {/* Image Section */}
              <div className="w-2/6 flex flex-col items-center">
                <img
                  src={userDetails.photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border border-gray-300 shadow-md"
                />
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Profile Image URL"
                  value={userDetails.photoURL}
                  onChange={handleChange}
                  className="mt-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
