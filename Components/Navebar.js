"use client"
import React, {useState} from 'react'
import { Menu, X } from "lucide-react";


const Navebar = () => {
const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo & Company Name */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
          <span className="text-xl font-bold text-gray-800">Company Name</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Write a feedback</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Read feedbacks</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Forums</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Discussion Boards</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Dispute Review</a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100">Join Now</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign-in</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-white shadow-md p-4 space-y-4">
        <a href="#" className="block text-gray-700 hover:text-blue-600">Home</a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">Write a feedback</a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">Read feedbacks</a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">Forums</a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">Discussion Boards</a>
        <a href="#" className="block text-gray-700 hover:text-blue-600">Dispute Review</a>
        <div className="flex space-x-4">
          <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100">Login</button>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign Up</button>
        </div>
      </div>
    )}
  </nav>
  )
}

export default Navebar

