import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Dashboard from './components/Dashboard'
import Formulario from './components/Formulario'
import ProductsList from './components/ProductsList'
import UsersList from './components/UsersList'
import React from 'react';
import { useSelector } from 'react-redux';



function App() {
  // Usa useSelector para acceder al estado del email desde Redux
  const email = useSelector((state) => state.formulario.email);

  return (
      <>
          <Formulario />
      </>
  );
}

export default App;

