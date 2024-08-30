import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="container-fluid vh-100 sinPadding">
            <div className="row h-100">
                {/* Columna de listado a la derecha */}
                <div className="col-md-4 col-lg-3 d-flex flex-column sinPadding">
                    <div className="p-2 border flex-grow-1">
                    <img src="/images/noticiasdlogo.png" alt="Imagen de ejemplo" className="img-fluid" id='logo-nd' />

                        <ul className="list-group list-group-flush no-border">
                            <li className="list-group-item no-border">
                                <img src="/images/barchar_icon.png" alt="Icono 1" className="icon me-2" /> Dashoard
                            </li>
                            <li className="list-group-item no-border">
                                <img src="/images/notas_icon.png" alt="Icono 1" className="icon me-2" /> Notas
                            </li>
                            <li className="list-group-item no-border">
                                <img src="/images/reportes_icon.png" alt="Icono 1" className="icon me-2" /> Reportes
                            </li>
                            <li className="list-group-item no-border">
                                <img src="/images/encuestas_icon.png" alt="Icono 1" className="icon me-2" /> Encuestas
                            </li>
                            <li className="list-group-item no-border">
                                <img src="/images/auto_entrevistas_icon.png" alt="Icono 1" className="icon me-2" /> Auto-entrevistas
                            </li>
                            <li className="list-group-item no-border mb-5">
                                <img src="/images/notificacion_icon.png" alt="Icono 1" className="icon me-2" /> Notificaciones
                            </li>



                            <ul className="list-group list-group-flush mt-5">
                                <li className="list-group-item pb-3">
                                    <img src="/images/ayuda_icon.png" alt="Icono 1" className="icon me-2" /> Ayuda y soporte
                                </li>
                                <li className="list-group-item no-border mt-auto">
                                    <img src="/images/municipio_icon.png" alt="Icono 12" className="icon me-2" /> Mun. de Villa Maria
                                </li>
                            </ul>
                        </ul>
                    </div> 

                </div>

                {/* Área principal para widgets */}
                <div className="col-md-8 col-lg-9">
                    <div className="p-3 mt-3">
                        <h4>Hola</h4>
                        <h3>Municipio de Villa maria</h3>

                        <div className="row mt-3">
                            <div className="col-md-6 mb-3">
                                <div className="p-3 border bg-light">
                                    <h5>Widget 1</h5>
                                    <p>Contenido del widget 1</p>

                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="p-3 border bg-light">
                                    <h5>Widget 2</h5>
                                    <p>Contenido del widget 2</p>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="p-3 border bg-light">
                                    <h5>Widget 3</h5>
                                    <p>Contenido del widget 3</p>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="p-3 border bg-light">
                                    <h5>Widget 4</h5>
                                    <p>Contenido del widget 4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
