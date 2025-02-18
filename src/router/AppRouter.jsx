import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Header from "../pages/Header";
import ProtectedRoute from "../pages/ProtectedRoute";
import EditTask from "../pages/EditTask";
import CategoryManager from "../pages/CategoryManager";
import Footer from "../pages/Footer";
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:taskId" element={<EditTask />} />
        <Route path="/category" element={<CategoryManager/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
      {/* Add Footer  Here*/}
      <Footer/>
    </Router>
  );
};

export default AppRouter;