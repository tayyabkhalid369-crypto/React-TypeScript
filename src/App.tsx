import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListing from './pages/UserListing';
import UserProfile from './pages/UserProfile';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserListing />} />
        <Route path="/profile/:uuid" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
