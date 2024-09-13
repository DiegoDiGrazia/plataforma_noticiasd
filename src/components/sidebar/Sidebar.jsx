import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './Sidebar.css'; // Si tienes un archivo CSS específico para el sidebar

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pantalla_actual, setPantallaActual] = useState("Dashboard") 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>

                <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                    <div className=" flex-grow-1">
                        {isOpen ? <img src="/images/noticiasdlogo.png" alt="Imagen de ejemplo" className="img-fluid" id="logo-nd-sidebar" />:
                        <img src="/images/logo_nd_miniatura.png" alt="Imagen de ejemplo" className="img-fluid" id="logo-nd-miniatura" />
                        }


                    <Button className="sidebar-toggle" variant='none' onClick={toggleSidebar}>
                        {isOpen ? <img src="/images/sidebar_left_bot.png" alt="Imagen de ejemplo" className="img-fluid" /> : 
                        <img src="/images/sidebar_right_bot.png" alt="Imagen de ejemplo" className="img-fluid" />} 
                    </Button>

                        <ul className="list-group list-group-flush no-border">
                            <li className={pantalla_actual == "Dashboard" && "boton_sidebar_clickeado"}>
                                <Button className="" variant='none'>
                                    <img src="/images/barchar_icon.png" alt="Icono 1" className="icon me-2" />
                                    <span className={`descripcion_boton ${isOpen ? 'open' : 'closed'}`}>Dashboard</span>
                                </Button>
                            </li>
                            <li className="list-group-item no-border">
                                <Button className="">
                                    <img src="/images/notas_icon.png" alt="Icono 1" className="icon me-2" /> 
                                    <span className={`descripcion_boton ${isOpen ? 'open' : 'closed'}`}>Notas</span>
                                </Button>
                            </li>
                            <li className="list-group-item no-border">
                                <Button className="d-flex align-items-center p-0">
                                    <img src="/images/reportes_icon.png" alt="Icono 1" className="icon me-2" /> 
                                    <span className={`descripcion_boton ${isOpen ? 'open' : 'closed'}`}>Reportes</span>
                                </Button>
                            </li>
                            <li className="list-group-item no-border">
                                <Button className="d-flex align-items-center p-0">
                                    <img src="/images/encuestas_icon.png" alt="Icono 1" className="icon me-2" /> 
                                    <span className={`descripcion_boton ${isOpen ? 'open' : 'closed'}`}>Encuestas</span>
                                </Button>
                            </li>
                            <li className="list-group-item no-border">
                                <Button className="d-flex align-items-center p-0">
                                    <img src="/images/auto_entrevistas_icon.png" alt="Icono 1" className="icon me-2" /> 
                                    <span className={`descripcion_boton ${isOpen ? 'open' : 'closed'}`}>Auto-entrevistas</span>
                                </Button>
                            </li>
                            <li className="list-group-item no-border mb-5">
                                <Button className="d-flex align-items-center p-0">
                                    <img src="/images/notificacion_icon.png" alt="Icono 1" className="icon me-2" /> 
                                    <span className={`descripcion_boton ${isOpen ? 'open' : 'closed'}`}>Notificaciones</span>
                                </Button>
                            </li>

                            <ul className="list-group" id= "botones_inferiories">
                                <li className="list-group-item pb-3">
                                    <Button variant="link" className="d-flex align-items-center p-0">
                                        <img src="/images/ayuda_icon.png" alt="Icono 1" className="icon me-2" /> 
                                        <span className={`descripcion_boton ${isOpen ? 'open' : 'closed'}`}>Ayuda y soporte</span>
                                    </Button>
                                </li>
                                <li className="list-group-item no-border mt-auto">
                                    <Button variant="link" className="d-flex align-items-center p-0">
                                        <img src="/images/municipio_icon.png" alt="Icono 12" className="icon me-2" />
                                        <span className={`descripcion_boton ${isOpen ? 'open' : 'closed'}`}> Mun. de Villa Maria</span>
                                    </Button>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
        </>
    );
};

export default Sidebar;