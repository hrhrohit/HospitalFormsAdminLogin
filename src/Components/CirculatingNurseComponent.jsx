import React, { useState, useEffect } from 'react';
import { addUser, fetchAllNames, updateDocument } from '../firebaseConfig';
import Modal from './Modals/modal'; // Make sure Modal is adaptable for both nurses and doctors

function CirculatingNurseComponent() {
  const [nurseName, setNurseName] = useState('');
  const [nursePhone, setNursePhone] = useState('');
  const [nurses, setNurses] = useState([]);
  const [editingNurse, setEditingNurse] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch nurse data when showDetails is true
  useEffect(() => {
    if (showDetails) {
      const fetchData = async () => {
        const docs = await fetchAllNames("CirculatingNurseDetails"); // Adjust to your actual function if different
        setNurses(docs);
      };
      fetchData();
    }
  }, [showDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDocId = await addUser({
        name: nurseName,
        phone: nursePhone
      }, "CirculatingNurseDetails");
      if (showDetails) {
        setNurses([...nurses, { id: newDocId, name: nurseName, phone: nursePhone }]);
      }
      setNurseName('');
      setNursePhone('');
      console.log('Document added with ID:', newDocId);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleEdit = (nurse) => {
    setEditingNurse(nurse);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Circulating Nurse Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nurseName" className="block text-gray-700 text-sm font-bold mb-2">
            Nurse's Name
          </label>
          <input
            type="text"
            id="nurseName"
            value={nurseName}
            onChange={(e) => setNurseName(e.target.value)}
            placeholder="Enter Nurse's Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nursePhone" className="block text-gray-700 text-sm font-bold mb-2">
            Nurse's Phone Number
          </label>
          <input
            type="tel"
            id="nursePhone"
            value={nursePhone}
            onChange={(e) => setNursePhone(e.target.value)}
            placeholder="Enter Nurse's Phone Number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
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
            {nurses.map(nurse => (
              <tr key={nurse.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6">{nurse.name}</td>
                <td className="py-4 px-6">{nurse.phone}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleEdit(nurse)} className="font-medium text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingNurse && <Modal person={editingNurse} onSave={(data) => updateDocument(editingNurse.id, data, "CirculatingNurseDetails")} onClose={() => setEditingNurse(null)} />}
    </div>
  );
}

export default CirculatingNurseComponent;
