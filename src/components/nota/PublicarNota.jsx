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
import { setCategorias, setImagenPrincipal, setImagenRRSS } from '../../redux/crearNotaSlice'; // Asegúrate de importar setImagenPrincipal

const PublicarNota = () => {
    const dispatch = useDispatch();
    const TOKEN = useSelector((state) => state.formulario.token);
    const imageRef = useRef(null);
    const [cropper, setCropper] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null); // Estado para la imagen recortada

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

    // Inicializa Cropper cuando la imagen cambia
    useEffect(() => {
        if (imageRef.current && image) {
            if (cropper) {
                cropper.destroy(); // Destruye el anterior cropper antes de crear uno nuevo
            }
            const newCropper = new Cropper(imageRef.current, {
                aspectRatio: NaN, // Permite cualquier relación de aspecto
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

    return (
        <div className="container-fluid sinPadding crearNotaGlobal">
            <div className="d-flex h-100">
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
                        <div className='row'>
                            <div className='col mt-0'>
                                <h3 className='headerPublicarNota fw-bold'>Agregar categorias a tu Nota</h3>
                                <h3 className='abajoDeAgregarCategoria'>Selecciona las tres categorias claves para tu contenido</h3>
                            </div>
                        </div>
                    </header>
                    
                    {/* SECCION NOTA */}
                    <div className='row notaTutorial'>
                        <div className='col-8 columnaNota'>
                            <div className='filaCategorias'>
                                {categorias.map((categoria, index) => (
                                    <Button onClick={() => actualizarCategoriasActivas(categoria)} key={index} className={categoriasActivas.includes(categoria.id) ? 'categoriaActiva' : 'categorias' }>
                                        {categoria.unidad}
                                    </Button>
                                ))}
                            </div>

                            <div className='seccionImagenRecorteRRSS'>
                                <h3 className='imagenParaRRSSHeader fw-bold'>Imagen para redes sociales</h3>
                                <h3 className='abajoDeAgregarCategoria mlRRSS'>Selecciona el recorte de tu imagen de portada para que podamos ajustarlo en redes sociales</h3>
                                
                                {image && (
                                    <div>
                                        <img
                                            ref={imageRef}
                                            src={image}
                                            alt="Imagen seleccionada"
                                            className='custom_image_modal'
                                        />
                                        {/* ESTE HANDLE CROP LO TENGO QUE HACER AL CLICKEAR EN EL BOTON PUBLICAR */}
                                        {/* <Button onClick={handleCrop} className='botonModalContinuar'>
                                            Recortar Imagen
                                        </Button> */}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='col-2 columnaTutorial'>
                            <img src="/images/tutorialvideo.png" alt="Icono 1" className="icon me-2 icono_tusNotas" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicarNota;
