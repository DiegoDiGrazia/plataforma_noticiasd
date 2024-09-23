import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar'; // Importa el Sidebar
import './Dashboard.css';
import Barplot from '../barplot/Barplot';
import InteraccionPorNota from './datosRelevantes/InteraccionPorNota';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltro } from '../../redux/dashboarSlice';
import PlataformaMasImpresiones from './datosRelevantes/PlataformaMasImpresiones';
import MediosMasRelevantes from './datosRelevantes/MediosMasRelevantes';
import CategoriasMasRelevantes from './datosRelevantes/CategoriasMasRelevantes';

export function formatNumberMiles(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

const Dashboard = () => {
    const dispatch = useDispatch();
    console.log("asdasd")
    const FiltroActual = useSelector((state) => state.dashboard.filtro);
    const nombreCliente = useSelector((state) => state.formulario.cliente);

    const handleClickFiltro = (nuevoFiltro)=>{
        dispatch(setFiltro(nuevoFiltro))
    }

    return (
        <div className="container-fluid  sinPadding">
            <div className="d-flex h-100">
                <Sidebar /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1">
                    <div className="p-3 mt-4">
                        <header id = "head_dash">
                            <h4 id="saludo">Hola</h4>
                            <h3 id="nombre_municipio">{nombreCliente}</h3>
                            <Button id="botonCrearNota" variant="none">
                                <img src="/images/boton_crear_nota.png" alt="Icono 1" className="icon me-2" /> 
                            </Button>
                        </header>

                    {/* aca va el subtitulo */}
                        <div className="subtitulo">
                            <h5 id= "subtitulo_performance">Performance de la cuenta</h5>
                            <span className='botones_subtitulo'>
                                <div className="dropdown">
                                    <button className="btn custom-dropdown-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="/images/calendarIcon.png" alt="Icono 1" className="icon me-2" />  {FiltroActual}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="#" onClick={() => handleClickFiltro("Ultimos 3 meses")}>Ultimos 3 meses</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => handleClickFiltro("Ultimos 6 meses")}>Ultimos 6 meses</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => handleClickFiltro("Ultimo año")}>Ultimo año</a></li>

                                    </ul>
                                </div>
                                <div className="dropdown">
                                    <button className="btn custom-dropdown-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="/images/share_icon.png" alt="Icono 1" className="icon me-2" />
                                        Compartir
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </span>
                        </div>

                        {/* aca va el barplot */}
                        <div className="mb-2">
                            <Barplot desde={"2024-01"} hasta={"2024-12"}/>
                        </div>
                        {/* aca van los datos relevantes */}
                       <div className='row g-1'>
                            <div className='col m-2 p-3 back-white'>
                                {/* <InteraccionPorNota/> */}
                            </div>
                            <div className='col m-2 p-3 back-white'>
                                {/* <PlataformaMasImpresiones/> */}
                            </div>
                        </div> 
                        <div className='row g-1'>
                            <div className='col m-2 p-3 back-white'>
                                 {/* <MediosMasRelevantes/>  */}
                            </div>
                            <div className='col m-2 p-3 back-white'>
                                <CategoriasMasRelevantes/>
                            </div>
                        </div>

                        

                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;