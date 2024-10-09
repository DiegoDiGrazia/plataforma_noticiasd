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
import BarplotNota from '../barplot/BarplotNota';
import { useLocation } from 'react-router-dom';
import PlataformaMasImpresionesNotas from '../Dashboard/datosRelevantes/PlataformaMasImpresionesNota';
import MediosMasRelevantesNotas from '../Dashboard/datosRelevantes/MediosMasRelevantesNotas';
import { formatearFecha } from '../Dashboard/datosRelevantes/InteraccionPorNota';

const VerNota = () => {

    const location = useLocation();
    const { id } = location.state || {};
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
                token: TOKEN,          
                id_noti: id,
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
                                    <div className='row vn_fecha'> Publicada el {formatearFecha(Nota.f_pub)} </div>
                                    <div className='row vn_estado publicada'> Publicada  </div> 
                                    <div className='row order-last'>
                                        <div>
                                            <span className='vn_categoria'>{Nota.categorias}</span>
                                        </div>
                                    </div>
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
                        </div>
                        <div className="mb-2 tamaño_barplot">
                             { <BarplotNota/> } 
                        </div>
                        <div className='row g-1'>
                            <div className='col m-2 p-3 back-white'>
                                { <PlataformaMasImpresionesNotas/> }
                            </div>
                            <div className='col m-2 p-3 back-white'>
                                   {<MediosMasRelevantesNotas/>}   
                            </div>
                        </div> 
                </div>
            </div>
        </div>

    );
};

export default VerNota;