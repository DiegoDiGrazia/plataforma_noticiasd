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
import { useLocation, useNavigate } from 'react-router-dom';
import PlataformaMasImpresionesNota from '../Dashboard/datosRelevantes/PlataformaMasImpresionesNota';
import MediosMasRelevantesNotas from '../Dashboard/datosRelevantes/MediosMasRelevantesNotas';
import { formatearFecha } from '../Dashboard/datosRelevantes/InteraccionPorNota';
import { Link } from 'react-router-dom';
import CrearNota from './CrearNota';
import { setNotaAEditar } from '../../redux/crearNotaSlice';
const VerNota = () => {

    const location = useLocation();
    const { id, notaABM } = location.state || {};
    
    const [Nota, setNota] = useState({});
    console.log(notaABM)
    
    const dispatch = useDispatch();
    const TOKEN = useSelector((state) => state.formulario.token);
    const CLIENTE = useSelector((state) => state.formulario.cliente);
    const navigate = useNavigate();
    
    const editarNota = (notaABM) => {
        dispatch(setNotaAEditar(notaABM))
        navigate("/crearNota"); // Pasar la nota usando la propiedad `state`
    };
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

    const id_noti = Nota.id_noti
    return (
        <div className="container-fluid  sinPadding">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"notas"} /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1">
                    <div className='row'>
                        <div className='col'>
                            <h4 id="nota">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/notas" className='breadcrumb-item'>{'< '} Notas</Link></li>
                                    <li className="breadcrumb-item blackActive" aria-current="page">Ver Nota</li>
                                </ol>
                            </nav>
                            </h4>
                        </div>
                    </div>
                        <div className='row margin_vn'>
                            <div className='col imagen_col'>
                                    <img src={Nota.imagen} alt="Icono 1" className="imagen_nota" />
                            </div>
                            <div className='col-6 d-flex flex-column' style={{ height: "200px" }}>
                                <div className='row vn_titulo'>{Nota.titulo}</div>
                                <div className='row vn_fecha'> Publicada el {formatearFecha(Nota.f_pub)} </div>
                                <div className='row publicada'> 
                                    <img src="/images/publicada.png" alt="Icono 1" className="" /> 
                                </div>
                                <div className='row order-last flex-grow-1'> {/* Agregar flex-grow-1 aquí */}
                                    <div>
                                        <span className='vn_categoria'>{Nota.categorias}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col boton_nota d-flex justify-content-end align-items-start'>
                                <button className="btn custom-dropdown-button dropdown-toggle boton_compartir" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="/images/share_icon.png" alt="Icono 1" className="icon me-2" />
                                    Compartir
                                </button>
                                <button className="btn custom-dropdown-button boton_compartir" type="button" onClick={() => editarNota(notaABM)}>
                                    Editar
                                </button>
                            </div>
                            {/* <div className='col-2 ver_nota_boton'>
                                    <button className='ver_nota_boton'> 
                                    <img src="/images/ver_nota_boton.png" alt="Icono 1" className="" />
                                    </button> 
                            </div> */}
                        </div>
                    <div className="subtitulo">
                        <h5 id= "subtitulo_performance">Performance de la nota</h5>
                    </div>
                    <div className="mb-2 tamaño_barplot">
                            { <BarplotNota id_noti={id_noti}/> } 
                    </div>
                    <div className='row g-1'>
                        <div className='col m-2 p-3 back-white'>
                            { <PlataformaMasImpresionesNota id_noti={id_noti}/> }
                        </div>
                        <div className='col m-2 p-3 back-white'>
                                {<MediosMasRelevantesNotas id_noti={id_noti}/>}   
                        </div>
                    </div> 
                </div>
            </div>
        </div>

    );
};

export default VerNota;