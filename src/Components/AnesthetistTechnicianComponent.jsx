import React, { useState, useEffect } from 'react';
import { addUser, fetchAllNames, updateDocument } from '../firebaseConfig';
import Modal from './Modals/modal';  // Assuming this Modal is adaptable for different types of data

function AnesthetistTechnicianComponent() {
  const [technicianName, setTechnicianName] = useState('');
  const [technicianPhone, setTechnicianPhone] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showDetails) {
      const fetchData = async () => {
        const docs = await fetchAllNames("AnesthetistTechnicianDetails"); // Adjust to your actual function if different
        setTechnicians(docs);
      };
      fetchData();
    }
  }, [showDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDocId = await addUser({
        name: technicianName,
        phone: technicianPhone
      }, "AnesthetistTechnicianDetails");
      if (showDetails) {
        setTechnicians([...technicians, { id: newDocId, name: technicianName, phone: technicianPhone }]);
      }
      setTechnicianName('');
      setTechnicianPhone('');
      console.log('Document added with ID:', newDocId);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleEdit = (technician) => {
    setEditingTechnician(technician);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Anesthetist Technician Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="technicianName" className="block text-gray-700 text-sm font-bold mb-2">
            Technician's Name
          </label>
          <input
            type="text"
            id="technicianName"
            value={technicianName}
            onChange={(e) => setTechnicianName(e.target.value)}
            placeholder="Enter Technician's Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="technicianPhone" className="block text-gray-700 text-sm font-bold mb-2">
            Technician's Phone Number
          </label>
          <input
            type="tel"
            id="technicianPhone"
            value={technicianPhone}
            onChange={(e) => setTechnicianPhone(e.target.value)}
            placeholder="Enter Technician's Phone Number"
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
            {technicians.map(technician => (
              <tr key={technician.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6">{technician.name}</td>
                <td className="py-4 px-6">{technician.phone}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleEdit(technician)} className="font-medium text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingTechnician && <Modal person={editingTechnician} onSave={(data) => updateDocument(editingTechnician.id, data, "AnesthetistTechnicianDetails")} onClose={() => setEditingTechnician(null)} />}
    </div>
  );
}

export default AnesthetistTechnicianComponent;
