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
import { setTodasLasNotas, setultimaFechaCargadaNotas, setNotasEnRevision, setNotasBorrador, setNotasPublicadas } from '../../redux/notasSlice';
import { Link, useNavigate } from 'react-router-dom';
import { formatearFecha } from '../Dashboard/datosRelevantes/InteraccionPorNota';
import { formatearTitulo } from '../Dashboard/datosRelevantes/InteraccionPorNota';


const CantidadDeNotasPorPagina = 6;

const Notas = () => {
    const navigate = useNavigate()
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(1); /// botones TODAS LAS NOTAS; EN PROGRESO; FINALIZADAS
    const [numeroDePagina, setNumeroDePagina] = useState(1); /// para los botones de la paginacion
    const ultimaFechaCargadaNota = useSelector((state) => state.notas.ultimaFechaCargadaNotas);
    
    const botones = [
        { id: 1, nombre: 'Todas las notas' },
        { id: 2, nombre: 'Publicadas' },
        { id: 4, nombre: 'Borradores' },
        { id: 3, nombre: 'En revision' },
        { id: 5, nombre: 'Elimidas' },
    ];


    
    const handleFiltroClick = (id) => {
        setFiltroSeleccionado(id); // Actualiza el filtro seleccionado
        console.log(`Filtro seleccionado: ${id}`);
    
        const fecha = new Date();
        const dia = String(fecha.getDate());
        let categoria = "";
        // Determina la categoría según el filtro seleccionado
        if (id === 1) {
            categoria = "todas";
        } else if (id === 2) {
            categoria = "PUBLICADO";
        } else if (id === 3) {
            categoria = "EN REVISION";
        } else if (id === 4) {
            categoria = "ELIMINADO";
        }
        if (false) {
            return; // Si la fecha y categoría coinciden, no haces la solicitud
        } else {
            // Si no coincide, actualizas la fecha y la categoría
            dispatch(setultimaFechaCargadaNotas({ dia, categoria }));
        
        // Realiza la solicitud sólo si el filtro tiene una categoría válida
            axios.post(
                id === 1 ? "app_obtener_noticias" : "app_obtener_noticias_abm",
                {
                    cliente: CLIENTE,
                    desde: `${DESDE}`,
                    hasta: `${HASTA}`,
                    token: TOKEN,
                    categoria: categoria,
                    limite: 7,
                    desde_limite: 0,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((response) => {
                console.log('Respuesta:', response.status);
    
                if (response.data.status === "true") {
                    console.log(`Datos cargados para el filtro: ${categoria}`);
                    console.log(response.data.item);
    
                    if (id === 1 ) { 
                    
                        dispatch(setTodasLasNotas(response.data.item));
                    } else if (id === 2) {
                        dispatch(setNotasPublicadas(response.data.item));
                    } else if (id === 3) {
                        dispatch(setNotasEnRevision(response.data.item));
                    } else if (id === 4) {
                        dispatch(setNotasBorrador(response.data.item));
                    }
    
                    dispatch(setultimaFechaCargadaNotas(fecha.getDate()));
                } else {
                    console.error('Error en la respuesta de la API:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error al hacer la solicitud:', error);
            });
        }
    };

    const handleBotonPaginaClick = (id) => {
        setNumeroDePagina(id);

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
    const HASTA = "2024-11-28"
    const TOKEN = useSelector((state) => state.formulario.token);
    const CLIENTE = useSelector((state) => state.formulario.cliente);

    const ultimaFechaCargada = useSelector((state) => state.cargado.fechaActual);
    const ultimaFechaCargadaNotas = useSelector((state) => state.barplot.ultimaFechaCargadaNotas);

    const todasLasNotas = useSelector((state) => state.notas.todasLasNotas);
    const notasPublicadas = useSelector((state) => state.notas.notasPublicadas);
    const notasEnBorrador = useSelector((state) => state.notas.notasEnBorrador);
    const notasEnRevision = useSelector((state) => state.notas.notasEnRevision);
    const notasEliminadas = useSelector((state) => state.notas.notasEliminadas);


    let TodasLasNotass = [];

switch (filtroSeleccionado) {
    case 2:
        TodasLasNotass = notasPublicadas || [];
        break;
    case 3:
        TodasLasNotass = notasEnBorrador || [];
        break;
    case 4:
        TodasLasNotass = notasEnRevision || [];
        break;
    case 5:
        TodasLasNotass = notasEliminadas || [];
        break;
    default:
        TodasLasNotass = todasLasNotas || [];
        break;
}
    

        
    const notasFiltradas = TodasLasNotass.filter(nota =>
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
    useEffect(() => {
        handleFiltroClick(filtroSeleccionado); // Ejecuta la función con el filtro inicial
    }, []); // Solo se ejecuta al montar el componente

    return (
        <div className="container-fluid  sinPadding">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"notas"} /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1">
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
                                <Button id="botonCrearNota" variant="none" onClick={() => navigate("/crearNota")}>
                                    <img src="/images/boton_crear_nota.png" alt="Icono 1" className="icon me-2" /> 
                                </Button>
                                </div>
                            </div>

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

                                {notasEnPaginaActual.map((nota) => (
                                    <div key={nota.id_noti ? nota.id_noti : nota.term_id} className='row pt-1 borderNotas'>
                                    <div className='col-1 colImgNota'>
                                        {nota.imagen ? <img src={nota.imagen} alt="Icono Nota" className='imagenWidwetInteracciones2' /> : 
                                        <img src={ "https://panel.serviciosd.com/img/" + nota.imagen_principal} alt="Icono Nota" className='imagenWidwetInteracciones2' /> }
                                        
                                    </div>
                                    <div className='col-4 pt-1 columna_interaccion nuevoFont'>
                                        <Link className = "link-sin-estilos" to ={`/verNota`} state={{ id: nota.id_noti ? nota.id_noti : nota.term_id, notaABM: nota }}>
                                        <div className='row p-0 nombre_plataforma'>
                                            {formatearTitulo(nota.titulo,45)}
                                        </div>
                                        </Link>
                                        <div className='row p-0'>
                                        <span className='FechaPubNota'>{nota.f_pub ?  formatearFecha(nota.f_pub): formatearFecha(nota.update_date) }</span>
                                        </div>
                                    </div>
                                    <div className='col-2 d-flex align-items-center'>
                                    <span className="publicada">
                                        <img src="./images/puntoVerde.png" alt="Icono Nota" className='' />
                                        {  "   Publicada"}</span>
                                    </div>
                                    <div className='col '>
                                        <span className="categoria_notas">{nota.categorias}</span>
                                    </div>
                                    <div className='col totales_widget'>
                                        <p>{nota.total ? nota.total : "Sin interacciones"}</p>
                                    </div>
                                    </div>
                                ))}

                            {/* Botonera de paginación */}
                            <div className='row'>
                                <div className="container">
                                <div className="row justify-content-center">
                                    {listaBotonesPagina.map((boton, index) => (
                                    <div key={index} className="col-auto">
                                        {boton === '...' ? (
                                        <span className="puntos">...</span>
                                        ) : (
                                        <button
                                            className={`boton_filtro_notas ${numeroDePagina === boton ? 'active' : ''}`}
                                            onClick={() => handleBotonPaginaClick(boton)}
                                        >
                                            {boton}
                                        </button>
                                        )}
                                    </div>
                                    ))}
                                </div> 
                                </div> 
                                </div>
                            </div>
                        </div>   
                </div>
            </div>
        </div>

    );
};

export default Notas;