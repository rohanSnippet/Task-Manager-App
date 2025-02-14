import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white shadow-md">
      <Link to={`/`} className="text-xl font-bold">
        Task Manager
      </Link>
      <nav>
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">Dashboard</Link>
            <img
              src={
                user.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
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
