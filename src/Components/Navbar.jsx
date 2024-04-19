import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white flex justify-between p-4">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="flex space-x-4">
        <Link to="/doctor" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300">Doctor</Link>
        <Link to="/circulating-nurse" className="px-4 py-2 bg-green-500 rounded hover:bg-green-700 transition duration-300">Circulating Nurse</Link>
        <Link to="/scrub-nurse" className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-700 transition duration-300">Scrub Nurse</Link>
        <Link to="/anesthetist" className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-300">Anesthetist</Link>
        <Link to="/anesthetist-technician" className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-700 transition duration-300">Anesthetist Technician</Link>
        <Link to="/full-details" className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-700 transition duration-300">Full Details</Link>
      </div>
    </nav>
  );
}

export default Navbar;
