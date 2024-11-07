// import React from 'react';
import * as React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloorManagement from './pages/floorManagement.tsx';
import HomePage from './pages/homePage.tsx';
import ErrorPage from './pages/errorPage.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<FloorManagement />} />
            <Route path="/floormanagement" index element={<FloorManagement />} />
            <Route path="/test" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
