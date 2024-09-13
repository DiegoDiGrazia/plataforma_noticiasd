import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar'; // Importa el Sidebar
import './Dashboard.css';
import Barplot from '../barplot/Barplot';
import InteraccionPorNota from './datosRelevantes/InteraccionPorNota';


const Dashboard = () => {
    return (
        <div className="container-fluid  sinPadding">
            <div className="d-flex h-100">
                <Sidebar /> {/* Usa el componente Sidebar */}
                <div className="content flex-grow-1">
                    <div className="p-3 mt-4">
                        <header id = "head_dash">
                            <h4 id="saludo">Hola</h4>
                            <h3 id="nombre_municipio">Municipio de Villa Maria</h3>
                            <Button id="botonCrearNota" variant="none">
                                <img src="/images/boton_crear_nota.png" alt="Icono 1" className="icon me-2" /> 
                            </Button>
                        </header>

                    {/* aca va el subtitulo */}
                        <div className="subtitulo">
                            <h5 id= "subtitulo_performance">Performance de la cuenta</h5>
                            <span className='botones_subtitulo'>
                                <div class="dropdown">
                                    <button class="btn custom-dropdown-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="/images/calendarIcon.png" alt="Icono 1" className="icon me-2" />  Último año
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                                <div class="dropdown">
                                    <button class="btn custom-dropdown-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="/images/share_icon.png" alt="Icono 1" className="icon me-2" />
                                        Compartir
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </span>
                        </div>

                        {/* aca va el barplot */}
                        <div className="mb-2">
                            <Barplot /> 
                        </div>
                        {/* aca van los datos relevantes */}
                        <div className='row g-1'>
                            <div className='col m-2 p-3 back-white'>
                                <InteraccionPorNota/>
                            </div>
                            <div className='col m-2 p-3 back-white'>
                                <InteraccionPorNota/>
                            </div>
                        </div>

                        

                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;