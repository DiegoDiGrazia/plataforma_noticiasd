import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar'; // Importa el Sidebar
import axios from 'axios';
import { useEffect } from 'react';

import "./miPerfil.css";
const Perfil = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [idClienten, setIdCliente] = useState('')
    const [conReporteWSP, setConReporteWSP] = useState('0')
    const [conReporteEmail, setConReporteEmail] = useState('0')



    useEffect(() => {
        axios.post(
            "https://panel.serviciosd.com/app_editar_usuario",
            {
                nombre : "nombre completo",
                email : "email para el login", 
                id : "id del usuario a editar",
                cliente : "nombre del cliente que tiene el usuario",
                reporte_whatsapp : "0 o 1 si recibe los reportes por whatsapp",
                reporte_email :  "0 o 1 si recibe los reportes por whatsapp",
                recibe_solo_notas :"",
                celular_reporte : '',
                email_reporte : '',
                frecuencia : '',
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((response) => {
            if (response.data.status === "true") {
                setUsuariosImpresionesNota(response.data.item);
                console.log(response.data.item)
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        })
    }, []);

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