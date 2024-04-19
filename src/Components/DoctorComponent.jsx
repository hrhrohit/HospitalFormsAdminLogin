import React, { useState, useEffect } from 'react';
import { addUser, fetchAllNames, updateDocument } from '../firebaseConfig';
import Modal from './Modals/modal';

function DoctorComponent() {
  const [doctorName, setDoctorName] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to track visibility of doctor details

  useEffect(() => {
    if (showDetails) {  // Only fetch details if they are to be shown
      const fetchData = async () => {
        const docs = await fetchAllNames("DoctorNameDetails");
        setDoctors(docs);
      };
      fetchData();
    }
  }, [showDetails]);  // Depend on showDetails to fetch data accordingly

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDocId = await addUser({
        name: doctorName,
        phone: doctorPhone
      }, "DoctorNameDetails");
      if (showDetails) {
        setDoctors([...doctors, { id: newDocId, name: doctorName, phone: doctorPhone }]);
      }
      setDoctorName('');
      setDoctorPhone('');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleEdit = (doc) => {
    setEditingDoctor(doc);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Add Doctor Information</h2>
      <form onSubmit={handleSubmit} className="mb-4">
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
      <button onClick={toggleDetails} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
            {doctors.map(doc => (
              <tr key={doc.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6">{doc.name}</td>
                <td className="py-4 px-6">{doc.phone}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleEdit(doc)} className="font-medium text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingDoctor && <Modal person={editingDoctor} onSave={(data) => updateDocument(editingDoctor.id, data, "DoctorNameDetails")} onClose={() => setEditingDoctor(null)} />}
    </div>
  );
}

export default DoctorComponent;
