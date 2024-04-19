import React, { useState } from 'react';
import { addUser } from '../firebaseConfig';

function AnesthetistTechnicianComponent() {
  // State to hold the inputs
  const [technicianName, setTechnicianName] = useState('');
  const [technicianPhone, setTechnicianPhone] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDocId = await addUser({
        name: technicianName,
        phone: technicianPhone
      }, "AnesthetistTechnicianDetails");
      setTechnicianName("")
      setTechnicianPhone("")
      console.log('Document added with ID:', newDocId);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Anesthetist Technician Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="technicianName" className="block text-gray-700 text-sm font-bold mb-2">
            Anesthetist Technician Name
          </label>
          <input
            type="text"
            id="technicianName"
            value={technicianName}
            onChange={(e) => setTechnicianName(e.target.value)}
            placeholder="Enter Anesthetist Technician's Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="technicianPhone" className="block text-gray-700 text-sm font-bold mb-2">
            Anesthetist Technician Phone Number
          </label>
          <input
            type="tel"
            id="technicianPhone"
            value={technicianPhone}
            onChange={(e) => setTechnicianPhone(e.target.value)}
            placeholder="Enter Anesthetist Technician's Phone Number"
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

export default AnesthetistTechnicianComponent;
