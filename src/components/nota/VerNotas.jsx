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
import { setTodasLasNotas } from '../../redux/notasSlice';
import Barplot from '../barplot/Barplot';

const VerNota = () => {

    const FiltroActual = useSelector((state) => state.dashboard.filtro);

    const [Nota, setNota] = useState({});
    
    const dispatch = useDispatch();
    const TOKEN = useSelector((state) => state.formulario.token);
    const CLIENTE = useSelector((state) => state.formulario.cliente);
    useEffect(() => {
        // Hacer la solicitud cuando el componente se monta o 'desde'/'hasta' cambian
        axios.post(
            "app_obtener_noticia",
            {
                token: "25b8289a43392d5e2bffcf8afbc3cd67",          
                id_noti: "825061",
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data' // Asegúrate de que el tipo de contenido sea correcto
                }
            }
        )
        .then((response) => {
            console.log('Respuesta:', response.status);

            if (response.data.status === "true") {
                console.log(response.data);
                setNota(response.data.item[0])
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }

        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });

    },[]); // Dependencias del useEffect 
    console.log(Nota)

 
    return (
        <div className="container-fluid  sinPadding">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"notas"} /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1">
                        <header id = "head_dasha" className='header_dasha'>
                            <div className='row'>
                                <h4 id="nota"> {"notas / ver nota"} </h4>
                            </div>
                            <div className='row margin_vn'>
                                <div className='col imagen_col'>
                                        <img src={Nota.imagen} alt="Icono 1" className="imagen_nota" />
                                </div>
                                <div className='col-6'>
                                    <div className='row vn_titulo'>{Nota.titulo}</div>
                                    <div className='row vn_fecha'> {Nota.f_pub} </div>
                                    <div className='row vn_estado'> Estado de la nota  </div> 
                                    <div className='row order-last'> Catasdeasdfasdgorsadfasdfias </div>
                                </div>
                                <div className='col boton_nota ml-5'>
                                    <button className="btn custom-dropdown-button dropdown-toggle boton_compartir" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="/images/share_icon.png" alt="Icono 1" className="icon me-2" />
                                        Compartir
                                    </button>
                                </div>
                                <div className='col ver_nota_boton'>
                                    {/* <button className='ver_nota_boton'> */}
                                        <img src="/images/ver_nota_boton.png" alt="Icono 1" className="" />
                                    {/* </button> */}
                                </div>
                            </div>
                        </header>
                        <div className="subtitulo">
                            <h5 id= "subtitulo_performance">Performance de la cuenta</h5>
                            <span className='botones_subtitulo'>
                                <div className="dropdown">
                                    <button className="btn custom-dropdown-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="/images/calendarIcon.png" alt="Icono 1" className="icon me-2" /> {FiltroActual}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li key="opcion1a">
                                            <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimos 3 meses")}>Últimos 3 meses</button>
                                        </li>
                                        <li key="opcion2b">
                                            <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimos 6 meses")}>Últimos 6 meses</button>
                                        </li>
                                        <li key="opcion3c">
                                            <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimo año")}>Último año</button>
                                        </li>
                                    </ul>
                                </div>
                            </span>
                        </div>
                        <div className="mb-2 tamaño_barplot">
                            { <Barplot/> }
                        </div>
                        
                </div>
            </div>
        </div>

    );
};

export default VerNota;