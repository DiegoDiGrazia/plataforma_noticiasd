import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button, Modal } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import "./nota.css";
import { useDispatch, useSelector } from 'react-redux';
import ImagenDeParrafo from './componetesNota/ImagenDeParrafo';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DeleteContenidoPorIndice, setCategorias, setContenidoNota, setImagenPrincipal, setImagenRRSS } from '../../redux/crearNotaSlice'; // Asegúrate de importar setImagenPrincipal
import { useNavigate } from 'react-router-dom';
import ColumnaEditorial from './Editorial/ColumnaEditorial';

const PublicarNota = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const TOKEN = useSelector((state) => state.formulario.token);
    const imageRef = useRef(null);
    const [cropper, setCropper] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null); // Estado para la imagen recortada
    const es_editor = useSelector((state) => state.formulario.es_editor);

    const image = useSelector((state) => state.crearNota.imagenPrincipal); // Imagen seleccionada

    useEffect(() => {
        // Hacer la solicitud cuando el componente se monta o 'desde'/'hasta' cambian
        axios.post(
            "app_obtener_listado_categorias",
            {
                token: TOKEN,          
                dimension: "categorias",
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data' // Asegúrate de que el tipo de contenido sea correcto
                }
            }
        )
        .then((response) => {
            if (response.data.status === "true") {
                dispatch(setCategorias(response.data.item));
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }

        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });

    },[]); // Dependencias del useEffect

    const transformarContenidoAHTML = (contenidos) => {
        if (!contenidos || !Array.isArray(contenidos)) {
            return ''; // Si no hay contenidos, devuelve un string vacío
        }
    
        // Construimos el HTML concatenando las etiquetas y el contenido
        const contenidoEnHTML = contenidos.reduce((html, contenido) => {
            const etiquetaAbrir = contenido[2];
            const etiquetaCerrar = contenido[3];
            return html + etiquetaAbrir + contenido[1] + etiquetaCerrar;
        }, '');
    
        return contenidoEnHTML; // Retorna el HTML como un string
    };

    /// subir la nota !!
    const titulo = useSelector((state) => state.crearNota.tituloNota);
    const contenidoNota = useSelector((state) => state.crearNota.contenidoNota)
    const clickear_en_publicar_nota = () => {
        const contenidoHTMLSTR = transformarContenidoAHTML(contenidoNota)
        const contenidoHTML = { __html: contenidoHTMLSTR }
        console.log(contenidoHTML)
        console.log(contenidoHTMLSTR)

        axios.post(
            "app_subir_nota",
            {
                token: TOKEN,
                id: '879783',
                titulo: titulo,
                categorias: categoriasActivas,
                copete: "",
                parrafo: contenidoHTMLSTR,
                estado: 'EN REVISION',
                distribucion: 'normal', // corregí el typo en "dstribucion"
                cliente: 'Municipio de 25 de Mayo (Buenos Aires)',
                email: 'prensamunicipalidad25demayo@gmail.com',
                base_principal: image,
                base_feed: image,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // JSON es el tipo adecuado aquí
                },
            }
        )
        .then((response) => {
            if (response.data.status === "true") {
                dispatch(setCategorias(response.data.item)); // Asegúrate de que dispatch esté disponible
            } else {
                console.error('Error en la respuesta de la API:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
        });
    };

    // Inicializa Cropper cuando la imagen cambia
    useEffect(() => {
        if (imageRef.current && image) {
            if (cropper) {
                cropper.destroy(); // Destruye el anterior cropper antes de crear uno nuevo
            }
            const newCropper = new Cropper(imageRef.current, {
                aspectRatio: 1, // Permite cualquier relación de aspecto
                viewMode: 3,
            });
            setCropper(newCropper); // Almacena la nueva instancia de Cropper
        }
    }, [image]);

    const handleCrop = () => {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas();
            const croppedBase64 = canvas.toDataURL(); // Obtiene la imagen recortada en base64
            dispatch(setImagenRRSS(croppedBase64)); // Guarda la imagen recortada en el estado global
        }
    };
    
    const categorias = useSelector((state) => state.crearNota.categorias) || [];
    const [categoriasActivas, setCategoriasActivas] = useState([]);

    const actualizarCategoriasActivas = (categoria) => {
        if (categoriasActivas.includes(categoria.id)) {
            setCategoriasActivas(categoriasActivas.filter(item => item !== categoria.id));
        } else if (categoriasActivas.length < 3) {
            setCategoriasActivas([...categoriasActivas, categoria.id]);
        }
    };
    const [selectedOption, setSelectedOption] = useState('flexRadioDefault2');

    // Función para manejar el cambio de opción seleccionada
    const handleChange = (event) => {
      setSelectedOption(event.target.id);
      console.log(selectedOption)
    };

    return (
            <div className="app-container">
                <Sidebar estadoActual={"notas"} />
                <div className="content flex-grow-1 crearNotaGlobal">
                    <header id="head_dash" className='header_dash'>
                        <div className='row'>
                            <div className='col'>
                                <h4 id="nota">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/notas" className='breadcrumb-item'>{'< '} Notas</Link></li>
                                        <li className="breadcrumb-item blackActive" aria-current="page">Nueva Nota</li>
                                    </ol>
                                </nav>
                                </h4>
                            </div>
                        </div>
                        
                    </header>
                    
                    {/* SECCION NOTA */}
                    <div className='row notaTutorial'>
                        <div className='col-8 columnaNota'>
                            <div className='col mt-0'>
                                <h3 className='headerPublicarNota fw-bold'>Agregar categorias a tu Nota</h3>
                                <h3 className='abajoDeAgregarCategoria mb-4'>Selecciona las tres categorias claves para tu contenido</h3>
                            </div>
                            <div className='filaCategorias'>
                                {Array.isArray(categorias) && categorias.map((categoria, index) => (
                                    <Button onClick={() => actualizarCategoriasActivas(categoria)} key={index} className={categoriasActivas.includes(categoria.id) ? 'categoriaActiva' : 'categorias' }>
                                        {categoria.unidad}
                                    </Button>
                                ))}
                            </div>

                            <div className='seccionImagenRecorteRRSS'>
                                <h4 className='imagenParaRRSSHeader fw-bold'>Imagen para redes sociales</h4>
                                <h4 className='abajoDeAgregarCategoria mlRRSS'>Selecciona el recorte de tu imagen de portada para que podamos ajustarlo en redes sociales</h4>

                                {image && (
                                    <div className='imagenRRSS'>
                                        <img

                                            ref={imageRef}
                                            src={image}
                                            alt="Imagen seleccionada"
                                            className='imagenRRSS'
                                        />
                                        {/* ESTE HANDLE CROP LO TENGO QUE HACER AL CLICKEAR EN EL BOTON PUBLICAR */}
                                        {/* <Button onClick={handleCrop} className='botonModalContinuar'>
                                            Recortar Imagen
                                        </Button> */}
                                    </div>
                                )}
                                <div className='hDistribucionContenido'>Distribucion de contenido</div>
                                <div className='abajoDeAgregarCategoria mlRRSS'>Selecciona el recorte de tu imagen</div>

                                <div>
                                    <div className= {selectedOption === 'flexRadioDefault1' ? 'containerFormCheckActive' : 'containerFormCheck'}>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault1"
                                            checked={selectedOption === 'flexRadioDefault1'}
                                            onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                <p className='distribuirNotaP'><strong>Distribuir nota</strong> {'(Te quedan 2/4 notas en tu plan)'}</p>
                                                <p className='abajoDeAgregarCategoria'>La distribucion de tu nota amplifica el impactoy la llegada a mas usuarios</p>
                                                
                                            </label>
                                        </div>
                                    </div>
                                    <div className={selectedOption === 'flexRadioDefault2' ? 'containerFormCheckActive' : 'containerFormCheck'}>
                                        <div className="form-check">
                                            <div className='inputRadioContainer'>
                                                <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                checked={selectedOption === 'flexRadioDefault2'}
                                                onChange={handleChange}
                                                />
                                            </div>
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                <p className='distribuirNotaP'><strong>No distribuir nota</strong></p>
                                                <p className='abajoDeAgregarCategoria mt-0 mb-0'>Tu contenido será amplificado de forma organica en nuestros canales</p>

                                            </label>
                                        </div>
                                    </div>
                                
                                </div>
                                <h4 className='imagenParaRRSSHeader fw-bold mt-3'>Comentarios</h4>
                                <p className='abajoDeAgregarCategoria'>Deja comentarios para el el equipo de Noticias 'd' pueda ayudarte a potenciar tus contenidos
                                    y entender mejor tus objetivos
                                </p>
                                <textarea placeholder='Escribi aqui tus comentarios' className='textAreaComentarios' maxLength={300}>
                                </textarea>
                                <p className='abajoDeAgregarCategoria' >Max 300 caracteres</p>
                                <div className='mb-5'>
                                    <Button onClick = {()=> clickear_en_publicar_nota() } id="botonPublicar" variant="none">
                                        <img src="/images/send.png" alt="Icono 1" className="icon me-2 icono_tusNotas" />{" Enviar"}
                                    </Button>
                                    <Button onClick = {()=> navigate('/crearNota') } id="botonVolver" variant="none">
                                     {" Volver"}
                                    </Button>
                                </div>




                            </div>
                            

                        </div>

                        <ColumnaEditorial/>
                    </div>
                </div>
            </div>
    );
};

export default PublicarNota;
