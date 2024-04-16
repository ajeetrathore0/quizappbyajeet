import logo from './logo.svg';
import './App.css';
import Home from './assets/componants/home';
import { useState, useEffect } from'react';
import axios from 'axios';
import { Routes, Route } from'react-router-dom';
function App() {
 
  
  return (
    <>
    <h1 className=''>Welcome to the Quiz App</h1>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
    
    </>
  );
}

export default App;
