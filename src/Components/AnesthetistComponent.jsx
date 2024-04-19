import React, { useState } from 'react';
import { addUser } from '../firebaseConfig';


function AnesthetistComponent() {
  const [anesthetistName, setAnesthetistName] = useState('');
  const [anesthetistPhone, setAnesthetistPhone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDocId = await addUser({
        name: anesthetistName,
        phone: anesthetistPhone
      }, "AnesthetistDetails");
      setAnesthetistName("")
      setAnesthetistPhone("")
      console.log('Document added with ID:', newDocId);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Anesthetist Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="anesthetistName" className="block text-gray-700 text-sm font-bold mb-2">
            Anesthetist Name
          </label>
          <input
            type="text"
            id="anesthetistName"
            value={anesthetistName}
            onChange={(e) => setAnesthetistName(e.target.value)}
            placeholder="Enter Anesthetist's Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="anesthetistPhone" className="block text-gray-700 text-sm font-bold mb-2">
            Anesthetist Phone Number
          </label>
          <input
            type="tel"
            id="anesthetistPhone"
            value={anesthetistPhone}
            onChange={(e) => setAnesthetistPhone(e.target.value)}
            placeholder="Enter Anesthetist's Phone Number"
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

export default AnesthetistComponent;
