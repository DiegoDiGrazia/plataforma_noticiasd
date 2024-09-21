import React from 'react';
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

function reduceBykeyMedios(lista_medios){


    let sitios = {}
    
    for(let medio of lista_medios) {
        if (sitios.hasOwnProperty(medio.sitio) == false){ // si en sitios, no esta agregado el sitio
            sitios[medio.sitio] = medio
        }else{
            sitios[medio.sitio].impresiones = Number(sitios[medio.sitio].impresiones);
            sitios[medio.sitio].impresiones += Number(medio.impresiones);
        }
    }   
    return sitios
}



const MediosMasRelevantes = () => {
    const nombreCliente = useSelector((state) => state.formulario.cliente);
    const periodos_api = useSelector((state) => state.dashboard.periodos_api)
    console.log(periodos_api)


    ///api///
    const dispatch = useDispatch();
    const token = useSelector((state) => state.formulario.token);
    const fechas = useSelector((state) => state.barplot.fechas);
    const FiltroActual = useSelector((state) => state.dashboard.filtro);



    console.log('antes del use efect');
    useEffect(() => {
        // Hacer la solicitud cuando el componente se monta o 'desde'/'hasta' cambian
        axios.post(
            "app_obtener_medios",
            {
                cliente: nombreCliente,
                periodos: periodos_api,
                token: token
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
                let meses = response.data.item;
                let todas_los_medios = []
                for (let mes of meses) {  
                    todas_los_medios.push(...mes.medios)
                }
                console.log(todas_los_medios)
                console.log(reduceBykeyMedios(todas_los_medios))
                const todos_los_medios_sin_repetir = Object.values(reduceBykeyMedios(todas_los_medios));

                const topTresMedios =  todos_los_medios_sin_repetir.sort((medioA, medioB) => Number(medioB.impresiones) - Number(medioA.impresiones)).slice(0, 3);
                console.log(topTresMedios)
                dispatch(setMediosMayorInteraccion(topTresMedios))
            
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }

        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });
    },[]); // Dependencias del useEffect


    const listaTresMedios = useSelector(state => state.interaccionesPorNota.mediosMayorInteraccion || []);
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
            <div className='row pt-1'>
                <div className='col-1'>
                    <img src={medio1.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1'>
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
            <div className='row pt-1'>
                <div className='col-1'>
                    <img src={medio2.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                        {medio2.nombre}
                    </div>
                    <div className='row p-0'> 
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
            <div className='row pt-1'>
                <div className='col-1'>
                    <img src={medio3.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1'>
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

export default MediosMasRelevantes;