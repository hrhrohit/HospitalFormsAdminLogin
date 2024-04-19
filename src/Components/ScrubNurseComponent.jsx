import React, { useState } from 'react';
import { addUser } from '../firebaseConfig';

function ScrubNurseComponent() {
  // State to hold the inputs
  const [nurseName, setNurseName] = useState('');
  const [nursePhone, setNursePhone] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDocId = await addUser({
        name: nurseName,
        phone: nursePhone
      }, "ScrubNurseDetails");
      setNurseName("")
      setNursePhone("")
      console.log('Document added with ID:', newDocId);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Scrub Nurse Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nurseName" className="block text-gray-700 text-sm font-bold mb-2">
            Scrub Nurse
          </label>
          <input
            type="text"
            id="nurseName"
            value={nurseName}
            onChange={(e) => setNurseName(e.target.value)}
            placeholder="Enter Scrub Nurse's Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nursePhone" className="block text-gray-700 text-sm font-bold mb-2">
            Nurse Phone Number
          </label>
          <input
            type="tel"
            id="nursePhone"
            value={nursePhone}
            onChange={(e) => setNursePhone(e.target.value)}
            placeholder="Enter Scrub Nurse's Phone Number"
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

export default ScrubNurseComponent;
