import React, { useState, useEffect } from 'react';
import { addUser, fetchAllNames, updateDocument } from '../firebaseConfig';
import Modal from './Modals/modal';  // Ensure this Modal is generic enough for reuse

function AnesthetistComponent() {
  const [anesthetistName, setAnesthetistName] = useState('');
  const [anesthetistPhone, setAnesthetistPhone] = useState('');
  const [anesthetists, setAnesthetists] = useState([]);
  const [editingAnesthetist, setEditingAnesthetist] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    if (showDetails) {
      const fetchData = async () => {
        const docs = await fetchAllNames("AnesthetistDetails"); // Adjust to your actual function if different
        setAnesthetists(docs);
      };
      fetchData();
    }
  }, [showDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDocId = await addUser({
        name: anesthetistName,
        phone: anesthetistPhone
      }, "AnesthetistDetails");
      if (showDetails) {
        setAnesthetists([...anesthetists, { id: newDocId, name: anesthetistName, phone: anesthetistPhone }]);
      }
      setAnesthetistName('');
      setAnesthetistPhone('');
      console.log('Document added with ID:', newDocId);
      setTimeout(() => {
        setSuccess(false)
      }, 3000);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleEdit = (anesthetist) => {
    setEditingAnesthetist(anesthetist);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Anesthetist Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="anesthetistName" className="block text-gray-700 text-sm font-bold mb-2">
            Anesthetist's Name
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
            Anesthetist's Phone Number
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
        {success && <div className="p-3 bg-green-200 text-green-800 rounded-md mb-3 mt-2">
          Submission successful!
        </div>}
      </form>
      <button onClick={toggleDetails} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {showDetails ? 'Hide All Details' : 'Show All Details'}
      </button>
      {showDetails && (
        <table className="w-full mt-4 text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Phone</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {anesthetists.map(anesthetist => (
              <tr key={anesthetist.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6">{anesthetist.name}</td>
                <td className="py-4 px-6">{anesthetist.phone}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleEdit(anesthetist)} className="font-medium text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingAnesthetist && <Modal person={editingAnesthetist} onSave={(data) => updateDocument(editingAnesthetist.id, data, "AnesthetistDetails")} onClose={() => setEditingAnesthetist(null)} />}
    </div>
  );
}

export default AnesthetistComponent;
