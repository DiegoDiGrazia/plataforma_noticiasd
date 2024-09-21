import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import UpdatePassword from './components/login/updatePassword';
import Dashboard from './components/Dashboard/Dashboard';
import Formulario from './components/login/Formulario';
import RecuperarContraseña from './components/login/RecuperarContraseña';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'; 


const inlineStyles = {
  marginRight: '10px'
};

function App() {

  
  return (
    <BrowserRouter>
      <header>
      </header>
      
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña/>} />
        <Route path="/actualizar-contraseña" element={<UpdatePassword/>} />
        <Route path="/" element={<Formulario />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
