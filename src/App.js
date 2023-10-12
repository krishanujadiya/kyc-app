// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import CaptureImage from './components/captureimage';
import DownloadVideo from './components/downloadvideo';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/capture-image">Capture Image</Link>
        <br/>
        <Link to="/record-video">Record & Download Video</Link>
      </div>
      <div className="Hello">
        <Routes>
          <Route path="/capture-image" element={<CaptureImage/>} />
          <Route path="/record-video" element={<DownloadVideo/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
