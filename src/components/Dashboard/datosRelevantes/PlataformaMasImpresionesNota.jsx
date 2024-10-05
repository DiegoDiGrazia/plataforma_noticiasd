import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InteraccionPorNota.css"
import { useSelector } from 'react-redux';
import { seleccionPorFiltro } from '../../barplot/Barplot';
import { formatNumberMiles } from '../Dashboard';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const PlataformaMasImpresionesNotas = () => {

    const [plataformas, setPlataformas] = useState([]); // Estado de carga
    const TOKEN = useSelector((state) => state.formulario.token);
    const f_pub = "2024-05-31 20:03:22"
    const id_noti = "825061"

    const fechaCompleta = new Date(f_pub);
    fechaCompleta.setDate(1);
    const desde = fechaCompleta.toISOString().split('T')[0];
    fechaCompleta.setMonth(fechaCompleta.getMonth() + 6);
    const hasta = fechaCompleta.toISOString().split('T')[0];


    useEffect(() => {
        // Hacer la solicitud cuando el componente se monta o 'desde'/'hasta' cambian
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
                    'Content-Type': 'multipart/form-data' // Asegúrate de que el tipo de contenido sea correcto
                }
            }
        )
        .then((response) => {
            console.log('Respuesta:', response.status);

            if (response.data.status === "true") {
                console.log(response.data);
                setPlataformas(response.data.item)
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }

        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });

    },[]); // Dependencias del useEffect 

    const ImpresionesFB = Number(plataformas.facebook);
    const ImpresionesIG = Number(plataformas.instagram);
    const ImpresionesDV = Number(plataformas.busqueda);

    return (
        <div className="container-fluid">
            <div className='row'>
                <p id= "titulo_relevantes">Plataforma con más impresiones
                <img src="/images/help-circle.png" alt="Descripción" className="info-icon" title= "aca va el texto"/>  
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
                        <a href="https://www.facebook.com" className='linkPlataforma'>www.Instagram.com</a>
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
                        <a href="https://www.facebook.com" className='linkPlataforma'>www.google.com</a>
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(ImpresionesDV)}</p>
                </div>
            </div>
        </div>
    );
};

export default PlataformaMasImpresionesNotas;