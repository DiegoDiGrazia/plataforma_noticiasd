import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar'; // Importa el Sidebar
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { setTodasLasNotas, setNotasEnProgreso, setNotasFinalizadas } from '../../redux/notasSlice';
import { Link } from 'react-router-dom';
import { formatearFecha } from '../Dashboard/datosRelevantes/InteraccionPorNota';
import { formatearTitulo } from '../Dashboard/datosRelevantes/InteraccionPorNota';
import "./miPerfil.css";
import { useRef } from 'react';

const CantidadDeNotasPorPagina = 6;

const Soporte = () => {
    const fileInputRef = useRef(null);

    const [filtroSeleccionado, setFiltroSeleccionado] = useState(1); /// botones TODAS LAS NOTAS; EN PROGRESO; FINALIZADAS
    const [numeroDePagina, setNumeroDePagina] = useState(1); /// para los botones de la paginacion
    
    const botones = [
        { id: 1, nombre: 'Todas las notificaciones' },
        { id: 2, nombre: 'No leídas' },
        { id: 3, nombre: 'Leídas' },
        // { id: 4, nombre: 'En revisión' },
    ];
    const handleClickFiltro = (nuevoFiltro)=>{
        console.log(nuevoFiltro)
    } 

    
    const handleFiltroClick = (id) => {
        setFiltroSeleccionado(id);
        console.log(`Filtro seleccionado: ${id}`);
        // Aquí puedes agregar lógica para filtrar los datos
    };

    const handleBotonPaginaClick = (id) => {
        setNumeroDePagina(id);

    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto
        event.dataTransfer.dropEffect = "copy"; // Cambia el icono a "copiar"
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]; // Obtiene el archivo arrastrado
        if (file && file.type.startsWith("image/")) {
            handleFileChange({ target: { files: [file] } }); // Llama a la función de cambio de archivo
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setShowModal(true); // Abre el modal cuando se carga la imagen
            };
            reader.readAsDataURL(file);
        }
    };
    
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        setNumeroDePagina(1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la búsqueda, por ejemplo, enviar el query a una API
        console.log('Buscando:', searchQuery);
        };
    
    /// Te devuelve la fecha actual con el formato "YYYY-MM-DD"

    
    return (
        <div className="container-fluid sinPadding crearNotaGlobal">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"soporte-y-ayuda"} /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1 crearNotaGlobal">
                    <div className='row miPerfilContainer soporteContainer'>
                        <div className='col p-0'>
                            <h3 id="saludo" className='headerTusNotas ml-0'>
                                <img src="/images/miPerfilIcon.png" alt="Icono 1" className="icon me-2 icono_tusNotas" /> Ayuda y soporte
                            </h3>
                            <h4 className='infoCuenta'>Centro de contenidos</h4>
                            <div className='abajoDeTusNotas'> Aqui encontraras contenidos que te ayudaran a potenciar el uso de nuestra plataforma. <br />
                                Tips, consejos, tutoriales y ayuda para tus contenidos</div>
                        </div>
                    </div>
                    <div className='row miPerfilContainer soporteContainer mt-4 p-0 mb-5'>
                        <div className='col todasLasNotas p-0 pt-2'>
                            Todas Los contenidos
                        </div>
                        <div className='col buscadorNotas'>
                            <form onSubmit={handleSearch} className='buscadorNotasForm'>
                                <input
                                    className='inputBuscadorNotas'
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    placeholder="      Buscar por palabra clave"
                                    
                                />
                            </form>
                            
                        </div>
                    </div>
                    <div className='row miPerfilContainer soporteContainer mt-4 p-0'>
                    <div className='col-4'>
                            <div className="card" style={{ width: "auto", height: "350px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Tunak tunak</h5>
                                    <p className="abajoDeTusNotas">Mira truk truk truk lalala. Mira truk truk truk lalala.Mira truk truk truk lalala. </p>
                                </div>

                                <iframe 
                                    width="auto" 
                                    height="250px" 
                                    src="https://www.youtube.com/embed/92ydUdqWE1g?si=ukxYbUqqzDPGW6jz"
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    className="iframeTutorial"
                                ></iframe>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="card" style={{ width: "auto", height: "350px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Tutorial alza tus brazos</h5>
                                    <p className="abajoDeTusNotas">Mira el tutorial y los tips clave para seleccionar y subir la imagen perfecta de portada.</p>
                                </div>

                                <iframe 
                                    width="auto" 
                                    height="250px" 
                                    src="https://www.youtube.com/embed/D9m9-mhJVio?si=ajkgR6KTmxW_rPMA"
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    className="iframeTutorial"
                                ></iframe>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="card" style={{ width: "auto", height: "350px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Tutorial caderas</h5>
                                    <p className="abajoDeTusNotas">Mira el tutorial y los tips clave para seleccionar y subir la imagen perfecta de portada. </p>
                                </div>

                                <iframe 
                                    width="auto" 
                                    height="250px" 
                                    src="https://www.youtube.com/embed/NOKeUhuCdlI?si=CeS74KqCch8ZnClf"
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    className="iframeTutorial"
                                ></iframe>
                            </div>
                        </div>

                        <div className='col-4'>
                            <div className="card" style={{ width: "auto", height: "350px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Imagen de portada</h5>
                                    <p className="abajoDeTusNotas">Mira el tutorial y los tips clave para seleccionar y subir la imagen perfecta de portada. </p>
                                </div>

                                <iframe 
                                    width="auto" 
                                    height="250px" 
                                    src="https://www.youtube.com/embed/3ekZv0f2sxU?si=nhgAc_Y1rvtZ5TA2"
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    className="iframeTutorial"
                                ></iframe>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="card" style={{ width: "auto", height: "350px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Comer una naranja tutorial</h5>
                                    <p className="abajoDeTusNotas">El matrimonio es como una naranja  El matrimonio es como una naranja</p>
                                </div>

                                <iframe 
                                    width="auto" 
                                    height="250px" 
                                    src="https://www.youtube.com/embed/8vY-9kIrBx4?si=-sIl60mbtvzOuH7l"
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    className="iframeTutorial"
                                ></iframe>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Soporte;