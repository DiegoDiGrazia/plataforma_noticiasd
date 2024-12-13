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
import { useNavigate } from 'react-router-dom';

const CantidadDeNotasPorPagina = 6;

const Perfil = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate()

    const [filtroSeleccionado, setFiltroSeleccionado] = useState(1); /// botones TODAS LAS NOTAS; EN PROGRESO; FINALIZADAS
    const [numeroDePagina, setNumeroDePagina] = useState(1); /// para los botones de la paginacion
    
    const botones = [
        { id: 1, nombre: 'Todas las notas' },
        { id: 2, nombre: 'En Progreso' },
        { id: 3, nombre: 'Finalizadas' },
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
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // getMonth() devuelve de 0 a 11, por lo que se suma 1
        const dia = String(fecha.getDate()).padStart(2, '0');
        
        return `${año}-${mes}-${dia}`;
        }

    const dispatch = useDispatch();
    ///api///
    const DESDE = "2024-09-01"
    const HASTA = "2024-09-29"
    const TOKEN = useSelector((state) => state.formulario.token);
    const CLIENTE = useSelector((state) => state.formulario.cliente);
    useEffect(() => {
        
    })

    const todasLasNotas = useSelector((state) => state.notas.todasLasNotas);
    const notasEnProgreso = useSelector((state) => state.notas.notasEnProgreso);
    const notasFinalizadas = useSelector((state) => state.notas.notasFinalizadas);
    
    let TodasLasNotas = todasLasNotas;
    if (filtroSeleccionado === 2) {
        TodasLasNotas = notasEnProgreso;
    } else if (filtroSeleccionado === 3) {
        TodasLasNotas = notasFinalizadas;
    }

        
    const notasFiltradas = TodasLasNotas.filter(nota =>
        nota.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPaginas = Math.ceil(notasFiltradas.length / CantidadDeNotasPorPagina);
    const notasEnPaginaActual = notasFiltradas.slice(
        (numeroDePagina - 1) * CantidadDeNotasPorPagina,
        numeroDePagina * CantidadDeNotasPorPagina
    );

    const listaBotonesPagina = [];
    for (let i = 1; i <= totalPaginas; i++) {
        listaBotonesPagina.push(i);
      }


    

    ///Chat gpt
    
    return (
        <div className="container-fluid sinPadding crearNotaGlobal">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"mi-perfil"} /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1 crearNotaGlobal">
                    <div className='row miPerfilContainer'>
                        <div className='col p-0'>
                            <h3 id="saludo" className='headerTusNotas ml-0'>
                                <img src="/images/miPerfilIcon.png" alt="Icono 1" className="icon me-2 icono_tusNotas" /> Mi Perfil
                            </h3>
                            <h4 className='infoCuenta'>Información de la cuenta</h4>
                            <div className='abajoDeTusNotas'> Aqui encontraras todos los detalles de tu cuenta</div>
                        </div>
                        <div className='col boton col-auto ms-auto'>

                        <Button onClick = {()=> navigate('/publicarNota') } id="" variant="none" className='botonCerrarSesion'>
                                    {"Cancelar"}
                        </Button>

                        <Button onClick = {()=> navigate('/publicarNota') } id="" variant="none" className='botonCerrarSesion guardar'>
                                {"Guardar"}
                        </Button>

                        </div>
                    </div>
                    <div className='row miPerfilContainer informacionCuentaSeccion'>
                        <div className='col align-items-center'>
                            <h4 className='infoCuenta'>Nombre de la cuenta</h4>
                        </div>
                        <div className='col textAreaContainer'>
                            <textarea placeholder='Municipalidad de Lanus' className='textAreaComentarios col-auto ms-auto'>
                            </textarea>
                        </div>
                    </div>
                    <div className='row miPerfilContainer informacionCuentaSeccion'>
                        <div className='col align-items-center'>
                            <h4 className='infoCuenta'>Email de la cuenta</h4>
                        </div>
                        <div className='col textAreaContainer'>
                            <textarea placeholder='Lanus@gmail.com ' className='textAreaComentarios col-auto ms-auto'>
                            </textarea>
                        </div>
                        
                    </div>
                    <div className='row miPerfilContainer informacionCuentaSeccion'>
                        <div className='col align-items-center'>
                            <h4 className='infoCuenta'>Whatssap de la cuenta</h4>
                        </div>
                        <div className='col textAreaContainer'>
                            <textarea placeholder='11-5122-1574' className='textAreaComentarios col-auto ms-auto'>
                            </textarea>
                        </div>
                    </div>

                    <div className='row miPerfilContainer informacionCuentaSeccion'>
                        <div className='col d-flex align-items-center'>
                            <span>
                                <img src="/images/municipio_icon.png" alt="Icono 1" className="me-2" />
                            </span>
                            <div>
                                <h4 className='infoCuenta mt-1'>Foto de perfil</h4>
                                <div className='abajoDeTusNotas'>Esta foto se muestra en el perfil de tu cuenta</div>
                            </div>
                        </div>
                                <div className="upload-block"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    >
                                    <input
                                        type="file"
                                        id="fileInput"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <img src="/images/uploadImagen.png" alt="Icono 1" className="icon me-2 icono_tusNotas" />

                                    <div className='displayFlex pt-1'>
                                        <label htmlFor="fileInput" className="custom-file-upload">
                                            {"Subí tu imagen "}
                                        </label>
                                        <div className='fontGrisImagen'>{" o arrástrala aquí"}</div>
                                    </div>
                                    <div className='fontGrisImagen'>
                                        SVG, PNG o JPG
                                    </div>
                                </div>

                    </div>
                    <div className='row miPerfilContainer informacionCuentaSeccion'>
                        <div className='col align-items-center'>
                            <div>
                                <h4 className='infoCuenta mt-1'>Reportes Automáticos</h4>
                                <div className='abajoDeTusNotas'>Selecciona con que frecuencia quieres recibir los reportes automáticos de la cuenta</div>
                            </div>
                        </div>
                        <div className='col textAreaContainer col-auto ms-auto'>
                        <div className="dropdown">
                                <button className="btn custom-dropdown-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="/images/calendarIcon.png" alt="Icono 1" className="icon me-2" /> {"Todas las semanas"}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li key="opcion1a">
                                        <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimos 3 meses")}>Una vez por dia</button>
                                    </li>
                                    <li key="opcion2b">
                                        <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimos 6 meses")}>Todas las semanas</button>
                                    </li>
                                    <li key="opcion3c">
                                        <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimo año")}>Una vez por mes</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='row miPerfilContainer informacionCuentaSeccion mb-5'>
                        <div className='col align-items-center'>
                            <div>
                                <h4 className='infoCuenta mt-1'>Cerrar sesión</h4>
                                <div className='abajoDeTusNotas'>Quieres salir de la cuenta? haz click en cerrar sesión</div>
                            </div>
                        </div>
                        <div className='col textAreaContainer col-auto ms-auto'>
                            <Button onClick = {()=> navigate('/') } id="" variant="none" className='botonCerrarSesion'>
                                    {"Cerrar Sesión"}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Perfil;