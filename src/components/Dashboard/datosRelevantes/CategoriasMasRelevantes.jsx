import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InteraccionPorNota.css"
import { useSelector } from 'react-redux';
import { seleccionPorFiltro } from '../../barplot/Barplot';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setCategoriasMayorInteraccion, setMediosMayorInteraccion, setNotasMayorInteraccion } from '../../../redux/interaccionesPorNotaSlice';

function formatearTextoNombre(texto) {
    // Cortar la cadena antes del punto
    let textoCortado = texto.split('.')[0];

    // Convertir la primera letra a mayúscula y el resto a minúsculas
    let textoFormateado = textoCortado.charAt(0).toUpperCase() + textoCortado.slice(1).toLowerCase();

    return textoFormateado;
}

function reduceBykeyCategorias(lista_medios){
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



const CategoriasMasRelevantes = () => {
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
                "app_obtener_categorias",
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
                    let mesesConCategorias = response.data.item;
                    dispatch(setCategoriasMayorInteraccion(mesesConCategorias))

                } else {
                    console.error('Error en la respuesta de la API:', response.data.message);

                }

            })
            .catch((error) => {
                console.error('Error al hacer la solicitud:', error);
            });
        },[]); // Dependencias del useEffect


    const categoriasPorMes = useSelector(state => state.interaccionesPorNota.categoriasMayorInteraccion || []);
    console.log(categoriasPorMes)


    
    // let medio1 = {}; 
    // let medio2 = {};
    // let medio3 = {};
    
    // if (listaTresMedios[0]) {
    //     let primero = listaTresMedios[0];
    //     medio1 = {
    //         imagen: "https://panel.serviciosd.com" + primero.imagen,
    //         nombre: formatearTextoNombre(primero.sitio),
    //         sitio: primero.sitio,
    //         impresiones: primero.impresiones,
    //     };
    // }
    
    // if (listaTresMedios[1]) {
    //     let primero = listaTresMedios[1];
    //     medio2 = {
    //         imagen: "https://panel.serviciosd.com" + primero.imagen,
    //         nombre: formatearTextoNombre(primero.sitio),
    //         sitio: primero.sitio,
    //         impresiones: primero.impresiones,
    //     };
    // }
    
    // if (listaTresMedios[2]) {
    //     let primero = listaTresMedios[2];
    //     medio3 = {
    //         imagen: "https://panel.serviciosd.com" + primero.imagen,
    //         nombre: formatearTextoNombre(primero.sitio),
    //         sitio: primero.sitio,
    //         impresiones: primero.impresiones,
    //     };
    // }

    return (
        <div className="container-fluid">
            <div className='row'>
                <p id= "titulo_relevantes">Categorias mas reelevantes
                <img src="/images/help-circle.png" alt="Descripción" className="info-icon" title= "aca va el texto"/>  
                </p>
            </div>
            {/* categoria*/}
            {true && //si existe la nota
            <div className='row pt-1'>
                <div className='col-8 pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                        Politica
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>123459</p>
                </div>
            </div>
            }
            {/* categoria*/}
            {true && //si existe la nota
            <div className='row pt-1'>
                <div className='col-4 pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                        Politica
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>123459</p>
                </div>
            </div>
            }
            {/* categoria*/}
            {true && //si existe la nota
            <div className='row pt-1'>
                <div className='col-4 pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                        Politica
                    </div>
                </div>
                <div className='col totales_widget'>
                    <p>123459</p>
                </div>
            </div>
            }
            
        </div>
    );
};

export default CategoriasMasRelevantes;