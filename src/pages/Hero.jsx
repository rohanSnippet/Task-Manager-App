import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = ({onLearnMoreClick}) => {
const navigate = useNavigate();
  return (
    <section className="relative w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Organize Your Tasks, Boost Your Productivity
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Manage your daily tasks efficiently with our powerful Task Manager. Stay on track, set deadlines, and achieve your goals effortlessly!
        </p>
        <div className="mt-6 flex justify-center md:justify-start gap-4">
          <button onClick={()=> navigate("/login")} className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition cursor-pointer">
            Get Started
          </button>
          <button onClick={onLearnMoreClick} className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:text-indigo-800 cursor-pointer transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Content - Illustration */}
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img 
          src="https://cdn3d.iconscout.com/3d/premium/thumb/businessman-doing-task-management-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--schedule-time-business-planning-pack-illustrations-7408555.png" 
          alt="Task Management Illustration" 
          className="w-full max-w-md mx-auto md:max-w-lg"
        />
      </div>
    </div>

    {/* Decorative Blur Effects */}
    <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 opacity-30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-0 w-40 h-40 bg-indigo-400 opacity-30 rounded-full blur-3xl"></div>
  </section>
  )
}

export default Hero

  