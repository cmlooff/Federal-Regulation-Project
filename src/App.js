import React, { Fragment } from 'react';
import ReactDOM from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Petition from './components/layout/Petition';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/petition' element={<Petition />} />
    </Routes>
  </Router>
);

// Making this file available to other files -> Connects to
export default App;
