import React from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import Login from './components/Login'
import Footer from './components/Footer'
import Home from './components/Home'
import Mail from './components/Mail'
import Passward from './components/Passward'
import Users from './components/Users'
import Profile from './components/Profile'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Login' element={<Login />} />
        <Route path='Mail' element={<Mail />} />
        <Route path='Passward' element={<Passward />} />
        <Route path='Users' element={<Users />} />
        <Route path='Profile' element={<Profile />} />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
