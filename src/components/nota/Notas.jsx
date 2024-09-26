import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar'; // Importa el Sidebar
import "./nota.css";
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { useEffect } from 'react';

const Notas = () => {

        const [filtroSeleccionado, setFiltroSeleccionado] = useState(1);
      
        const botones = [
          { id: 1, nombre: 'Todas las notas' },
          { id: 2, nombre: 'Publicadas' },
          { id: 3, nombre: 'Borradores' },
          { id: 4, nombre: 'En revisión' },
        ];
      
        const handleFiltroClick = (id) => {
          setFiltroSeleccionado(id);
          console.log(`Filtro seleccionado: ${id}`);
          // Aquí puedes agregar lógica para filtrar los datos
        };
        
        const [searchQuery, setSearchQuery] = useState('');
        
        const handleInputChange = (e) => {
            setSearchQuery(e.target.value);
        };

        const handleSearch = (e) => {
            e.preventDefault();
            // Aquí puedes manejar la búsqueda, por ejemplo, enviar el query a una API
            console.log('Buscando:', searchQuery);
          };


    return (
        <div className="container-fluid  sinPadding">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"notas"} /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1">
                        <header id = "head_dash" className='header_dash'>
                            <div className='row'>
                                <h4 id="nota">Notas</h4>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <h3 id="saludo" className='headerTusNotas'>
                                        <img src="/images/tusNotasIcon.png" alt="Icono 1" className="icon me-2 icono_tusNotas" /> Tus Notas
                                    </h3>
                                    <div className='abajoDeTusNotas'> Crea, gestiona y monitorea tus notas</div>
                                </div>
                                <div className='col boton'>
                                <Button id="botonCrearNota" variant="none">
                                    <img src="/images/boton_crear_nota.png" alt="Icono 1" className="icon me-2" /> 
                                </Button>
                                </div>
                            </div>
                        </header>

                        <div className='row'>
                            <div className="container">
                                <div className="row ">
                                    {botones.map((boton) => (
                                    <div key={boton.id} className="col-auto">
                                        <button
                                        className={`boton_filtro_notas ${
                                            filtroSeleccionado === boton.id ? 'active' : ''
                                        }`}
                                        onClick={() => handleFiltroClick(boton.id)}
                                        >
                                        {boton.nombre}
                                        </button> 
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* todas las notas mas buscador */}
                        <div className='row'>
                            <div className="container-notas">
                                <div className='row'>
                                    <div className='col todasLasNotas'>
                                        Todas Las Notas
                                    </div>
                                    <div className='col buscadorNotas'>
                                        <form onSubmit={handleSearch} className='buscadorNotasForm'>
                                            <input
                                                className='inputBuscadorNotas'
                                                type="text"
                                                value={searchQuery}
                                                onChange={handleInputChange}
                                                placeholder="      Buscar por titulo de la nota"
                                                
                                            />
                                        </form>
                                        
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 categoriasNotas'>
                                        titulo de la nota 
                                    </div>
                                    <div className='col-2 categoriasNotas'>
                                        Estado <img src="/images/flechaEstado.png" alt="Icono 1" className="icon me-2 icono_Estado" />
                                    </div>
                                    <div className='col-4 categoriasNotas'>
                                        Categorias
                                    </div>
                                    <div className='col categoriasNotas textoALaDerecha'>
                                        Interacciones
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* sector notas */}

                        
                </div>
            </div>
        </div>

    );
};

export default Notas;