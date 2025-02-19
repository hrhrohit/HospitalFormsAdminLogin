import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import DoctorComponent from './Components/DoctorComponent';
import CirculatingNurseComponent from './Components/CirculatingNurseComponent';
import AnesthetistComponent from './Components/AnesthetistComponent';
import ScrubNurseComponent from './Components/ScrubNurseComponent';
import AnesthetistTechnicianComponent from './Components/AnesthetistTechnicianComponent';
import FullDetailsComponent from './Components/FullDetailsComponent'; // Make sure to import the new component

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/doctor" element={<DoctorComponent />} />
          <Route path="/circulating-nurse" element={<CirculatingNurseComponent />} />
          <Route path="/anesthetist" element={<AnesthetistComponent />} />
          <Route path="/scrub-nurse" element={<ScrubNurseComponent />} />
          <Route path="/anesthetist-technician" element={<AnesthetistTechnicianComponent />} />
          <Route path="/full-details" element={<FullDetailsComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
