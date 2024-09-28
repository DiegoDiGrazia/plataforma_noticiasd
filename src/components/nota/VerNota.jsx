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

const VerNota = () => {

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
    const DESDE = "2021-01-01"
    const HASTA = obtenerFechaActual()
    const TOKEN = useSelector((state) => state.formulario.token);
    const CLIENTE = useSelector((state) => state.formulario.cliente);
    useEffect(() => {
        // Hacer la solicitud cuando el componente se monta o 'desde'/'hasta' cambian
        axios.post(
            "app_obtener_noticias",
            {
                CLIENTE: CLIENTE,
                DESDE: `${DESDE}`,
                HASTA: `${HASTA}`,
                TOKEN: TOKEN,
                CATEGORIA: "todas"
                
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
                dispatch(setTodasLasNotas(response.data.item))
            
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }

        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });

    },[]); // Dependencias del useEffect 

 
    return (
        <div className="container-fluid  sinPadding">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"notas"} /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1">
                        <header id = "head_dash" className='header_dash'>
                            <div className='row'>
                                <h4 id="nota"> {"notas / ver nota"} asd</h4>
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

                        
                </div>
            </div>
        </div>

    );
};

export default VerNota;