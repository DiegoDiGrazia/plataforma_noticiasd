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

const CantidadDeNotasPorPagina = 6;
const Notas = () => {


    const obtenerListaDeNumerosDePaginas = (listaNotas) =>{
        let cantidadDeNotas = listaNotas.length;
        ///cuantas paginas tengo=
        let cantidadDePaginas= Math.floor(cantidadDeNotas / CantidadDeNotasPorPagina) + 1
        ///DevolverLista
        return Array.from({ length: cantidadDePaginas }, (_, i) => i + 1);
        
    }

    const [filtroSeleccionado, setFiltroSeleccionado] = useState(1);
    const [numeroDePagina, setNumeroDePagina] = useState(1);
    
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

    const handleBotonPaginaClick = (id) => {
        setNumeroDePagina(id);
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
                cliente: CLIENTE,
                desde: `${DESDE}`,
                hasta: `${HASTA}`,
                token: TOKEN,
                categoria: "todas"
                
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

    const TodasLasNotas = useSelector((state) => state.notas.todasLasNotas)
    console.log(TodasLasNotas)
    const listaBotonesPagina = obtenerListaDeNumerosDePaginas(TodasLasNotas)
    console.log(listaBotonesPagina)
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
                                    <div className='col-5 categoriasNotas'>
                                        titulo de la nota 
                                    </div>
                                    <div className='col-2 categoriasNotas'>
                                        Estado <img src="/images/flechaEstado.png" alt="Icono 1" className="icon me-2 icono_Estado " />
                                    </div>
                                    <div className='col-3 categoriasNotas'>
                                        Categorias
                                    </div>
                                    <div className='col categoriasNotas text-end'>
                                        Interacciones
                                    </div>
                                </div>
                                {/* aca va la nota */}
                                {TodasLasNotas.slice(0, CantidadDeNotasPorPagina).map((nota, index) => (
                                <div key={index} className='row pt-1 borderNotas'>
                                    <div className='col-1'>
                                        <img src={nota.imagen} alt="Icono Nota" className='imagenWidwetInteracciones2' />
                                    </div>
                                    <div className='col-4 pt-1 columna_interaccion nuevoFont'>
                                        <div className='row p-0 nombre_plataforma'>
                                            {nota.titulo}
                                        </div>
                                        <div className='row p-0'>
                                            <span className='FechaPubNota'>{nota.f_pub}</span>
                                        </div>
                                    </div>

                                    <div className='col-2'>
                                        {true ? 
                                            <img src="/images/publicada.png" alt="Publicada" /> : 
                                            <img src="/images/finalizada.png" alt="Finalizada" />}
                                    </div>

                                    <div className='col'>
                                        {nota.categorias}
                                    </div>

                                    <div className='col totales_widget'>
                                        <p>{nota.interacciones ? nota.interacciones : "Sin interacciones"}</p>
                                    </div>
                                </div>
                            ))}

                            </div>
                        </div>
                        {/* botonera inferior pagina de notas */}
                        <div className='row'>
                            <div className="container">
                                <div className="row justify-content-center">
                                    {listaBotonesPagina.map((boton) => (
                                    <div key={listaBotonesPagina} className="col-auto">
                                        <button
                                        className={`boton_filtro_notas ${
                                            numeroDePagina === boton ? 'active' : ''
                                        }`}
                                        onClick={() => handleBotonPaginaClick(boton)}
                                        >
                                        {boton}
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

export default Notas;