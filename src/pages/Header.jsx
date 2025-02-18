import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
    });
  
    if (!confirmLogout.isConfirmed) return; // If user cancels, do nothing
  
    try {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
  
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error logging out!",
        text: "Please try again.",
      });
    }
  };

  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white shadow-md">
      <Link to={`${user?`/dashboard`:`/`}`} className="text-xl font-bold">
        Task Manager
      </Link>
      <nav>
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile"><img
              src={
                user.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full"
            /></Link>
            <span>{user.displayName || user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
