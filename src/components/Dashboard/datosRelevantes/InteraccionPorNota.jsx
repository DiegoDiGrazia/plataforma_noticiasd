import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InteraccionPorNota.css"
import { useSelector } from 'react-redux';
import { seleccionPorFiltro } from '../../barplot/Barplot';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setNotasMayorInteraccion } from '../../../redux/interaccionesPorNotaSlice';
import { formatNumberMiles } from '../Dashboard';


function formatearTitulo(titulo) {
    if (titulo.length > 25) {
        return titulo.slice(0, 25) + "...";
    }
    return titulo;
}

function formatearFecha(fechaStr) {
    // Crear un objeto Date a partir de la cadena de fecha
    const fecha = new Date(fechaStr);

    // Array de los meses del año
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    // Obtener el día, mes y año
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    // Retornar la fecha en el formato deseado
    return `${dia} de ${mes} de ${anio}`;
}

function estaPublicada(fecha_vencimiento){
    const fecha_actual = new Date(fechaStr);
    if(fecha_vencimiento <= fecha_actual){
        return "Publicada"
    }
    return "Finalizada"
}


console.log(formatearTitulo("ASDASDASDASDASDASDASDASDADASDlñghklñghñlkghkjñlgkhjñlghjkñghklghj"))


const InteraccionPorNota = () => {
    const periodos_api = useSelector((state) => state.dashboard.periodos_api)
    const nombreCliente = useSelector((state) => state.formulario.cliente);
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
            "app_obtener_notas",
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
                let todas_las_notas = []
                for (let mes of meses) {  
                    todas_las_notas.push(...mes.notas)
                }
                console.log(todas_las_notas)
                const topTresNotas = todas_las_notas.sort((notaA, notaB) => Number(notaB.total) - Number(notaA.total)).slice(0, 3);
                console.log(topTresNotas)
                dispatch(setNotasMayorInteraccion(topTresNotas))
            
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }

        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });
    },[]); // Dependencias del useEffect


    const listaTresNotas = useSelector(state => state.interaccionesPorNota.notasMayorInteraccion)
    let nota1 = {};
    let nota2 = {};
    let nota3 = {};
    
    if (listaTresNotas[0]) {
        let primero = listaTresNotas[0];
        nota1 = {
            imagen: primero.imagen,
            fecha_publicacion: formatearFecha(primero.f_pub),
            titulo: formatearTitulo(primero.titulo),
            f_vence: primero.f_vence,
            interacciones: primero.total,
            publicada: true
        };
    }
    
    if (listaTresNotas[1]) {
        let segundo = listaTresNotas[1];
        nota2 = {
            imagen: segundo.imagen,
            fecha_publicacion: formatearFecha(segundo.f_pub),
            titulo: formatearTitulo(segundo.titulo),
            f_vence: segundo.f_vence,
            interacciones: segundo.total,
            publicada:true,
        };
    }
    
    if (listaTresNotas[2]) {
        let tercero = listaTresNotas[2];
        nota3 = {
            imagen: tercero.imagen,
            fecha_publicacion: formatearFecha(tercero.f_pub),
            titulo: formatearTitulo(tercero.titulo),
            f_vence: tercero.f_vence,
            interacciones: tercero.total,
            publicada: true,
        };
    }
    

    return (
        <div className="container-fluid">
            <div className='row'>
                <p id= "titulo_relevantes">Interacciones por nota
                <img src="/images/help-circle.png" alt="Descripción" className="info-icon" title= "aca va el texto"/>  
                </p>
                
            </div>
            {/* Nota Uno */}
            {listaTresNotas[0] && //si existe la nota
            <div className='row pt-1'>
                <div className='col-1'>
                    <img src={nota1.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                        {nota1.titulo}
                    </div>
                    <div className='row p-0'> 
                        <a href="https://www.facebook.com" className='linkPlataforma'>{nota1.fecha_publicacion}</a>
                    </div>
                </div>
                <div className='col publicada '>
                    {nota1.publicada? <img src="/images/publicada.png" alt="Icono 1" /> : 
                                        <img src="/images/finalizada.png" alt="Icono 1" />}
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(nota1.interacciones)}</p>
                </div>
            </div>
            }
            {/* nota2 */}
            {listaTresNotas[1] && //si existe la nota
            <div className='row pt-1'>
                <div className='col-1'>
                    <img src={nota2.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                    {nota2.titulo}
                    </div>
                    <div className='row p-0'> 
                        <a href="https://www.facebook.com" className='linkPlataforma'>{nota2.fecha_publicacion}</a>
                    </div>
                </div>
                <div className='col publicada'>
                {nota2.publicada? <img src="/images/publicada.png" alt="Icono 1" /> : 
                                        <img src="/images/finalizada.png" alt="Icono 1" />}
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(nota2.interacciones)}</p>
                </div>
            </div>
            }
            {/* nota3 */}
            {listaTresNotas[2] && //si existe la nota
            <div className='row pt-1'>
                <div className='col-1'>
                    <img src={nota3.imagen} alt="Icono 1" className='imagenWidwetInteracciones' />
                </div>
                <div className='col-4 pt-1'>
                    <div className='row p-0 nombre_plataforma'> 
                    {nota3.titulo}
                    </div>
                    <div className='row p-0'> 
                        <a href="https://www.facebook.com" className='linkPlataforma'>{nota3.fecha_publicacion}</a>
                    </div>
                </div>
                <div className='col publicada'>
                    {nota3.publicada? <img src="/images/publicada.png" alt="Icono 1" /> : 
                                            <img src="/images/finalizada.png" alt="Icono 1" />}
                </div>
                <div className='col totales_widget'>
                    <p>{formatNumberMiles(nota3.interacciones)}</p>
                </div>
            </div>
            }
        </div>
    );
};

export default InteraccionPorNota;