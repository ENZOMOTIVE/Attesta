// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/Welcome/welcome';
import FormPage from './components/Form/form';
import Dashboard from './components/Dashboard/dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/Display Info" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
};

export default App;
