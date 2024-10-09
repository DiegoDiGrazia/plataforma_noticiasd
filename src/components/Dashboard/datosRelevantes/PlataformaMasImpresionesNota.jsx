import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { formatNumberMiles } from '../Dashboard';
import "./InteraccionPorNota.css";

const PlataformaMasImpresionesNotas = () => {
    const [plataformas, setPlataformas] = useState([]); // Estado de carga
    const [openIndex, setOpenIndex] = useState(null); // Estado del acordeón
    const TOKEN = useSelector((state) => state.formulario.token);
    const f_pub = "2024-05-31 20:03:22";
    const id_noti = "825061";

    const fechaCompleta = new Date(f_pub);
    fechaCompleta.setDate(1);
    const desde = fechaCompleta.toISOString().split('T')[0];
    fechaCompleta.setMonth(fechaCompleta.getMonth() + 6);
    const hasta = fechaCompleta.toISOString().split('T')[0];

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        axios.post(
            "app_obtener_impresiones_plataforma_noticia",
            {
                desde: desde,
                hasta: hasta,
                token: TOKEN,
                id_noti: id_noti
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((response) => {
            if (response.data.status === "true") {
                setPlataformas(response.data.item);
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });
    }, [desde, hasta, TOKEN, id_noti]); // Dependencias del useEffect 

    const ImpresionesFB = Number(plataformas.facebook);
    const ImpresionesIG = Number(plataformas.instagram);
    const ImpresionesDV = Number(plataformas.busqueda);

    return (
        <div className="container-fluid">
            <div className='row'>
                <p id="titulo_relevantes">Plataforma con más impresiones
                    <img src="/images/help-circle.png" alt="Descripción" className="info-icon" title="aca va el texto"/>
                </p>
            </div>
            {/* FACEBOOK */}
            <div className='row pt-0'>
                <div className='col-1'>
                    <img src="/images/logoFB.png" alt="Icono 1" className='imagenWidwet' />
                </div>
                <div className='col pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                        Facebook
                    </div>
                    <div className='row p-0'> 
                        <a href="https://www.facebook.com" className='linkPlataforma'>www.facebook.com</a>
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(ImpresionesFB)}</p>
                </div>
            </div>
            {/* INSTAGRAM */}
            <div className='row'>
                <div className='col-1'>
                    <img src="/images/logo_ig.png" alt="Icono 1" className='imagenWidwet' />
                </div>
                <div className='col pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                        Instagram
                    </div>
                    <div className='row p-0'> 
                        <a href="https://www.instagram.com" className='linkPlataforma'>www.instagram.com</a>
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(ImpresionesIG)}</p>
                </div>
            </div>
            {/* GOOGLE */}
            <div className='row'>
                <div className='col-1'>
                    <img src="/images/logo_google.png" alt="Icono 1" className='imagenWidwet' />
                </div>
                <div className='col pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                        Google
                    </div>
                    <div className='row p-0'> 
                        <a href="https://www.google.com" className='linkPlataforma'>www.google.com</a>
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(ImpresionesDV)}</p>
                </div>
            </div>

            <div className="accordion">
                {/* Accordion Item #1 */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${openIndex === 0 ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => toggle(0)}
                            aria-expanded={openIndex === 0}
                        >
                            Accordion Item #1
                        </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openIndex === 0 ? 'show' : ''}`}>
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default.
                        </div>
                    </div>
                </div>

                {/* Accordion Item #2 */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${openIndex === 1 ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => toggle(1)}
                            aria-expanded={openIndex === 1}
                        >
                            Accordion Item #2
                        </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openIndex === 1 ? 'show' : ''}`}>
                        <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default.
                        </div>
                    </div>
                </div>

                {/* Accordion Item #3 */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${openIndex === 2 ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => toggle(2)}
                            aria-expanded={openIndex === 2}
                        >
                            Accordion Item #3
                        </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openIndex === 2 ? 'show' : ''}`}>
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlataformaMasImpresionesNotas;
