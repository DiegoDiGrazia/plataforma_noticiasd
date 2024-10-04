import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar'; // Importa el Sidebar
import './Dashboard.css';
import Barplot from '../barplot/Barplot.jsx';
import InteraccionPorNota from './datosRelevantes/InteraccionPorNota.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltro } from '../../redux/dashboardSlice.js';
import PlataformaMasImpresiones from './datosRelevantes/PlataformaMasImpresiones.jsx';
import MediosMasRelevantes from './datosRelevantes/MediosMasRelevantes.jsx';
import CategoriasMasRelevantes from './datosRelevantes/CategoriasMasRelevantes.jsx';
import { seleccionPorFiltro } from '../barplot/Barplot.jsx';
import axios from 'axios';
import { useEffect } from 'react';


export function formatNumberMiles(num) {
    if (num === null || num === undefined || num === "") {
        return "";
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function formatFechaApiExportar(fechaStr) {
    // Separar la fecha en año y mes
    const [year, month] = fechaStr.split("-");
    
    // Formatear la fecha en "DD-MM-YYYY" con día fijo 01
    return `01-${month}-${year}`;
}


const Dashboard = () => {
    const dispatch = useDispatch();
    const nombreCliente = useSelector((state) => state.formulario.cliente);
    const FiltroActual = useSelector((state) => state.dashboard.filtro);
    const IDCliente = useSelector((state) => state.formulario.id_cliente);
    const periodos = useSelector((state) => state.dashboard.periodos_api).split(",");
    const [loading, setLoading] = useState(true); // Estado de carga

    console.log(periodos, IDCliente, FiltroActual, seleccionPorFiltro(FiltroActual) )

    const periodosActuales = periodos.slice(seleccionPorFiltro(FiltroActual))
    console.log(periodosActuales)

    const FechaDesde = formatFechaApiExportar(periodosActuales[0])
    const FechaHasta = formatFechaApiExportar(periodosActuales[periodosActuales.length - 1]);  


    ///DATOS DEL BARPLOT
    useEffect(() => {
        const interval = setInterval(() => {
            setSimulatedData(generateRandomData());
        }, 800); // Actualiza los datos simulados cada 500 ms

        axios.post(
            "app_obtener_usuarios",
            {
                cliente: nombreCliente,
                periodos: periodoUltimoAño(),
                token: token
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((response) => {
            if (response.data.status === "true") {
                let datos = response.data.item;
                for (let datoMensual of datos) {
                    if (!fechas.includes(datoMensual.periodo)) {
                        dispatch(setFechas(formatDate(datoMensual.periodo)));
                        dispatch(setUsuariosTotales(Number(datoMensual.usuarios_total)));
                        dispatch(setUsuariosTotalesMeta(Number(datoMensual.usuarios_redes)));
                        dispatch(setUsuariosTotalesGoogle(Number(datoMensual.usuarios_medios)));
                        dispatch(setImpresionesTotalesInstagram(Number(datoMensual.impresiones_instagram)));
                        dispatch(setImpresionesTotalesGoogle(Number(datoMensual.impresiones_busqueda)));
                        dispatch(setImpresionesTotalesFacebook(Number(datoMensual.impresiones_facebook)));
                    }
                }
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [FiltroActual]);


    /// FIN DATOS BARPLOT



    
    
    const handleClickFiltro = (nuevoFiltro)=>{
        console.log(nuevoFiltro)
        dispatch(setFiltro(nuevoFiltro))


    } 
    
    async function descargarReportePDF(id_cliente, fechaDesde, fechaHasta) {
        try {
            const response = await axios.get("reporte_descargarpdfwa", {
                params: {
                    id: id_cliente,  // El ID del cliente
                    to: "",           // Este valor está fijo en el URL que compartiste
                    desde: fechaDesde,    // Fecha de inicio
                    hasta: fechaHasta     // Fecha de fin
                },
            });
            
            console.log(response.data)
            window.open('https://dashboard.serviciosd.com/img/' + response.data, '_blank');
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
            throw error;
        }
    }
    useEffect(() => {
        // Aquí podrías hacer lógica adicional si es necesario.
        console.log("Filtro cambiado, actualizando Barplot");
    }, [FiltroActual]); // Se ejecuta cada vez que FiltroActual cambia


    
    return (
        <div className="container-fluid  sinPadding">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"dashboard"}/> {/* Usa el componente Sidebar */}
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
                                    <img src="/images/calendarIcon.png" alt="Icono 1" className="icon me-2" /> {FiltroActual}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li key="opcion1a">
                                        <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimos 3 meses")}>Últimos 3 meses</button>
                                    </li>
                                    <li key="opcion2b">
                                        <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimos 6 meses")}>Últimos 6 meses</button>
                                    </li>
                                    <li key="opcion3c">
                                        <button className="dropdown-item" onClick={() => handleClickFiltro("Ultimo año")}>Último año</button>
                                    </li>
                                </ul>
                            </div>
                                <div className="dropdown">
                                    <button className="btn custom-dropdown-button dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="/images/share_icon.png" alt="Icono 1" className="icon me-2" />
                                        Compartir
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                        <li><a className="dropdown-item" onClick={() => descargarReportePDF(IDCliente, FechaDesde,FechaHasta)}>Descargar PDF</a></li>
                                    </ul>
                                </div>
                            </span>
                        </div>

                        {/* aca va el barplot */}
                        <div className="mb-2 tamaño_barplot">
                            { <Barplot/> }
                        </div>
                        {/* aca van los datos relevantes */}
                       <div className='row g-1'>
                            <div className='col m-2 p-3 back-white'>
                               {  <InteraccionPorNota/>  }
                            </div>
                            <div className='col m-2 p-3 back-white'>
                                  {  <MediosMasRelevantes/>   } 
                            </div>
                        </div> 
                        <div className='row g-1'>
                            <div className='col m-2 p-3 back-white'>
                                 {  <PlataformaMasImpresiones/> }  
                            </div>
                            <div className='col m-2 p-3 back-white'>
                                { <CategoriasMasRelevantes/> }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;