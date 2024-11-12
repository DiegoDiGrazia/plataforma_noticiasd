import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InteraccionPorNota.css"
import { useSelector } from 'react-redux';
import { seleccionPorFiltro } from '../../barplot/Barplot';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setMediosMayorInteraccion, setNotasMayorInteraccion } from '../../../redux/interaccionesPorNotaSlice';
import { formatNumberMiles } from '../Dashboard';


function formatearTextoNombre(texto) {
    // Cortar la cadena antes del punto
    let textoCortado = texto.split('.')[0];

    // Convertir la primera letra a mayúscula y el resto a minúsculas
    let textoFormateado = textoCortado.charAt(0).toUpperCase() + textoCortado.slice(1).toLowerCase();

    return textoFormateado;
}

function reduceBykeyMedios(lista_medios) {
    let sitios = {};

    for (let medio of lista_medios) {
        if (!sitios[medio.sitio]) { // Si el sitio no existe aún
            // Inicializar el objeto del sitio
            sitios[medio.sitio] = {
                ...medio, // Copiar todas las propiedades de 'medio'
                impresiones: Number(medio.impresiones) // Asegurar que impresiones sea un número
            };
        } else {
            // Sumar las impresiones
            sitios[medio.sitio].impresiones += Number(medio.impresiones);
        }
    }

    return sitios; // Devuelve un objeto con los sitios como llaves
}




const MediosMasRelevantesNotas = ({id}) => {
    const nombreCliente = useSelector((state) => state.formulario.cliente);
    const periodos_api = useSelector((state) => state.dashboard.periodos_api)
    console.log(periodos_api)


    ///api///
    const dispatch = useDispatch();
    const token = useSelector((state) => state.formulario.token);
    const FiltroActual = useSelector((state) => state.dashboard.filtro);
    let cantidad_meses = seleccionPorFiltro(FiltroActual)
    const f_pub = "2024-05-31 20:03:22"
    const fechaCompleta = new Date(f_pub);
    fechaCompleta.setDate(1);
    const desde = fechaCompleta.toISOString().split('T')[0];
    fechaCompleta.setMonth(fechaCompleta.getMonth() + 6);
    const hasta = fechaCompleta.toISOString().split('T')[0];
    const id_noti = "825061"


    const [mediosNota, setMediosNota] = useState([])
    console.log('antes del use efect');
    useEffect(() => {
        // Hacer la solicitud cuando el componente se monta o 'desde'/'hasta' cambian
        axios.post(
            "app_obtener_medios_noticia",
            {
                cliente: nombreCliente,
                desde: desde,
                hasta: hasta,
                token: token,
                id_noti: "825061",
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data' // Asegúrate de que el tipo de contenido sea correcto
                }
            }
        )
        .then((response) => {
            if (response.data.status === "true") {
                setMediosNota(response.data.item)


            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }

        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });
    },[]); // Dependencias del useEffect

    let todas_los_medios = mediosNota
    const todos_los_medios_sin_repetir = Object.values(reduceBykeyMedios(todas_los_medios));

    const listaTresMedios =  todos_los_medios_sin_repetir.sort((medioA, medioB) => Number(medioB.impresiones) - Number(medioA.impresiones)).slice(0, 3);


    console.log(listaTresMedios)

    
    let medio1 = {}; 
    let medio2 = {};
    let medio3 = {};
    
    if (listaTresMedios[0]) {
        let primero = listaTresMedios[0];
        medio1 = {
            imagen: "https://panel.serviciosd.com" + primero.imagen,
            nombre: formatearTextoNombre(primero.sitio),
            sitio: primero.sitio,
            impresiones: primero.impresiones,
        };
    }
    
    if (listaTresMedios[1]) {
        let primero = listaTresMedios[1];
        medio2 = {
            imagen: "https://panel.serviciosd.com" + primero.imagen,
            nombre: formatearTextoNombre(primero.sitio),
            sitio: primero.sitio,
            impresiones: primero.impresiones,
        };
    }
    
    if (listaTresMedios[2]) {
        let primero = listaTresMedios[2];
        medio3 = {
            imagen: "https://panel.serviciosd.com" + primero.imagen,
            nombre: formatearTextoNombre(primero.sitio),
            sitio: primero.sitio,
            impresiones: primero.impresiones,
        };
    }
    

    return (
        <div className="container-fluid">
            <div className='row'>
                <p id= "titulo_relevantes">Medios mas relevantes
                <img src="/images/help-circle.png" alt="Descripción" className="info-icon" title= "aca va el texto"/>  
                </p>
            </div>
            {/* medio Uno */}
            {listaTresMedios[0] && //si existe la nota
            <div className='row pt-3 medioRowNota'>
                <div className='col-1'>
                    <img src={medio1.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1 columna_interaccion'>
                    <div className='row p-0 nombre_plataforma'> 
                        {medio1.nombre}
                    </div>
                    <div className='row p-0'> 
                        <a href="https://www.facebook.com" className='linkPlataforma'>{medio1.sitio}</a>
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(medio1.impresiones)}</p>
                </div>
            </div>
            }
            {/* medio2 */}
            {listaTresMedios[1] && //si existe la nota
            <div className='row pt-3 medioRowNota medioRowNota2'>
                <div className='col-1'>
                    <img src={medio2.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1 columna_interaccion'>
                    <div className='row p-0 nombre_plataforma'> 
                        {medio2.nombre}
                    </div>
                    <div className='row p-0 '> 
                        <a href="https://www.facebook.com" className='linkPlataforma'>{medio2.sitio}</a>
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(medio2.impresiones)}</p>
                </div>
            </div>
            }
            {/* medio3 */}
            {listaTresMedios[2] && //si existe la nota
            <div className='row pt-3 medioRowNota medioRowNota2'>
                <div className='col-1'>
                    <img src={medio3.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1 columna_interaccion'>
                    <div className='row p-0 nombre_plataforma'> 
                        {medio3.nombre}
                    </div>
                    <div className='row p-0'> 
                        <a href="https://www.facebook.com" className='linkPlataforma'>{medio3.sitio}</a>
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(medio3.impresiones)}</p>
                </div>
            </div>
            }
        </div>
    );
};

export default MediosMasRelevantesNotas;