
import React from "react";
 import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold">Task Manager</h2>
          <p className="text-gray-400 mt-2">
            Simplify your workflow and boost productivity with our easy-to-use task management app.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
            <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
            <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-gray-400 hover:text-white text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-white text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 hover:text-white text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-white text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
