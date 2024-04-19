import React, { useState } from 'react';
import { addUser } from '../firebaseConfig';

function DoctorComponent() {
  // State to hold the inputs
  const [doctorName, setDoctorName] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDocId = await addUser({
        name: doctorName,
        phone: doctorPhone
      }, "DoctorNameDetails");
      setDoctorName("")
      setDoctorPhone("")
      console.log('Document added with ID:', newDocId);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Add Doctor Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="doctorName" className="block text-gray-700 text-sm font-bold mb-2">
            Doctor's Name
          </label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter Doctor's Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="doctorPhone" className="block text-gray-700 text-sm font-bold mb-2">
            Doctor's Phone Number
          </label>
          <input
            type="tel"
            id="doctorPhone"
            value={doctorPhone}
            onChange={(e) => setDoctorPhone(e.target.value)}
            placeholder="Enter Doctor's Phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DoctorComponent;
