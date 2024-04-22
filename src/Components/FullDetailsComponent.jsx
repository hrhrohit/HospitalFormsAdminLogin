import React, { useState, useEffect } from 'react';
import { fetchAllDetails } from '../firebaseConfig';
import Modal from './Modals/SingleDetailModal';

function FullDetailsComponent() {
  const [details, setDetails] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null); // State to track the selected row detail

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllDetails('DoctorDetails');
      setDetails(data);
      setFilteredDetails(data);
    }
    fetchData();
  }, []);

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
    if (event.target.value === '') {
      setFilteredDetails(details);
    } else {
      const filtered = details.filter(detail => new Date(detail.surgeryDate).toLocaleDateString() === new Date(event.target.value).toLocaleDateString());
      setFilteredDetails(filtered);
    }
  };

  const handleRowClick = (detail) => {
    setSelectedDetail(detail);
  };

  const renderModalContent = () => {
    return selectedDetail ? (
      <div>
        <h2 className="text-lg font-bold mb-2">Surgery Details</h2>
        {Object.entries(selectedDetail).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value.toString()}
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Full Details of Surgeries</h2>
      <input
        type="date"
        value={filterDate}
        onChange={handleDateChange}
        className="mb-4 px-4 py-2 border rounded"
      />
      <table className="w-full mt-4 text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th>Mr No</th><th>Patient Name</th><th>Age</th><th>Sex</th><th>Surgeon</th>
            <th>Surgical Procedure</th><th>Hospital Number</th><th>Surgery Date</th>
            <th>Doctor Submit Time</th><th>Anesthetist</th><th>Anesthetist Technician</th>
            <th>OT</th><th>Surgery Time</th><th>Anesthetist Submit Time</th>
            <th>Ward</th><th>Circulating Nurse</th><th>Scrub Nurse</th><th>Room</th>
            <th>Nurse Submit Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map((detail, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(detail)}>
              <td>{detail.mrNo}</td><td>{detail.patientName}</td><td>{detail.age}</td><td>{detail.sex}</td>
              <td>{detail.surgeon}</td><td>{detail.surgicalProcedure}</td>
              <td>{detail.department}</td><td>{new Date(detail.surgeryDate).toLocaleDateString()}</td>
              <td>{detail.doctorSubmitTime}</td><td>{detail.anesthetist}</td>
              <td>{detail.anesthetistTechnician}</td><td>{detail.ot}</td>
              <td>{detail.surgeryTime}</td><td>{detail.anesthetistSubmitTime}</td>
              <td>{detail.ward}</td><td>{detail.circulatingNurse}</td>
              <td>{detail.scrubNurse}</td><td>{detail.room}</td>
              <td>{detail.nurseSubmitTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDetail && <Modal content={renderModalContent()} onClose={() => setSelectedDetail(null)} />}
    </div>
  );
}

export default FullDetailsComponent;
