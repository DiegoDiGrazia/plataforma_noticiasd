import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button, Modal } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import "./nota.css";
import SubtituloNota from './componetesNota/SubtituloNota';
import ParrafoNota from './componetesNota/ParrafoNota';
import TituloNota from './componetesNota/TituloNota';
import { setTituloNota, setContenidoNota } from '../../redux/crearNotaSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImagenDeParrafo from './componetesNota/ImagenDeParrafo';

const CrearNota = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [cropper, setCropper] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);
    const [showButtons, setShowButtons] = useState(false);
    const inputFileRef = useRef(null);

    const toggleButtons = () => {
      setShowButtons(!showButtons);
    };
    const handleClickEnNota = () => {
        // Simula un clic en el input de archivo
        inputFileRef.current.click();
      };

    const handleFileChangeEnNota = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Aquí puedes manejar la imagen seleccionada
        console.log("entro a agregar imagen")
        agregarImagen(file);
    }};
    
    const agregarSubtitulo = () => {
        dispatch(setContenidoNota(["subtitulo", ""]))
      };
    const agregarParrafo = () => {
        console.log("entra al parrafo")
        dispatch(setContenidoNota( ["parrafo", ""]));
    };
    const agregarImagen = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            dispatch(setContenidoNota(["imagen", reader.result])); // Almacena la imagen en base64
        };
        reader.readAsDataURL(file); // Convierte el archivo a base64
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto
        event.dataTransfer.dropEffect = "copy"; // Cambia el icono a "copiar"
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]; // Obtiene el archivo arrastrado
        if (file && file.type.startsWith("image/")) {
            handleFileChange({ target: { files: [file] } }); // Llama a la función de cambio de archivo
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setShowModal(true); // Abre el modal cuando se carga la imagen
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (imageRef.current && image) {
            if (cropper) {
                cropper.destroy();
            }
            const newCropper = new Cropper(imageRef.current, {
                aspectRatio: NaN,
                viewMode: 3,
            });
            setCropper(newCropper);
        }
    }, [image]);

    const handleCrop = () => {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas();
            setCroppedImage(canvas.toDataURL()); // Guarda la imagen recortada
            setShowModal(false); // Cierra el modal después de recortar
            setImage(null); // Oculta la imagen original
            cropper.destroy(); // Destruye el cropper
        }
    };
    const contenidoNota = useSelector((state) => state.crearNota.contenidoNota)
    return (
        <div className="container-fluid sinPadding crearNotaGlobal">
            <div className="d-flex h-100">
                <Sidebar estadoActual={"notas"} />
                <div className="content flex-grow-1 crearNotaGlobal">
                    <header id="head_dash" className='header_dash'>
                        <div className='row'>
                            <div className='col'>
                                <h4 id="nota">Notas / Crear Nota</h4>
                            </div>
                            <div className='col'>
                                <Button id="botonPublicar" variant="none">
                                    <img src="/images/send.png" alt="Icono 1" className="icon me-2 icono_tusNotas" />{" Publicar"}
                                </Button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col mt-0'>
                                <h3 className='headerCrearNota'>Crear nota</h3>
                            </div>
                        </div>
                    </header>
                    {/* SECCION NOTA */}
                    <div className='row notaTutorial'>
                        <div className='col-8 columnaNota'>
                        {!croppedImage && 
                            <div className='row seccionImagen'> 
                                <div className="upload-block"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    >
                                    <input
                                        type="file"
                                        id="fileInput"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <img src="/images/uploadImagen.png" alt="Icono 1" className="icon me-2 icono_tusNotas" />

                                    <div className='row justify-content-center pt-3'>
                                        Imagen de portada*
                                    </div>
                                    <div className='displayFlex pt-1'>
                                        <label htmlFor="fileInput" className="custom-file-upload">
                                            {"Subí tu imagen "}
                                        </label>
                                        <div className='fontGrisImagen'>{" o arrástrala aquí"}</div>
                                    </div>
                                    <div className='fontGrisImagen'>
                                        SVG, PNG o JPG
                                    </div>
                                </div>
                            </div>
                            }
                            {/* Muestra la imagen recortada */}
                            {croppedImage && (
                            <div className='row'>
                                    <div className="imagenRecortada">
                                        <img
                                            src={croppedImage}
                                            alt="Imagen recortada"
                                            className='imagenRecortada'
                                        />
                                    </div>
                                </div>
                            )}
                            <div className='row'>
                            <TituloNota/>

                            {contenidoNota && contenidoNota.map((contenido, index) => {
                            if (contenido[0] === "subtitulo") {
                                return <SubtituloNota key={index} indice={index}/>;
                            } else if(contenido[0] === "parrafo") {
                                return <ParrafoNota key={index} indice={index}/>;}
                            else if(contenido[0] === "imagen") {
                                return <ImagenDeParrafo key={index} indice={index} />;}
                            return null; // Esto te permite agregar otros tipos de contenido en el futuro
                            })}

                            {/* BOTONERA AGREGAR CONTENIDO */}
                            <div className="containerButton">
                                <button onClick={toggleButtons} className={`botones-nota ${showButtons ? 'boton-plus' : ''}`}>
                                    {showButtons ?  <img src="images/plus-circle-x.png" alt="" />:  <img src="images/plus-circle-+.png" alt="" /> }
                                </button>


                                {showButtons && (
                                    <div className="buttons-container">
                                    <button onClick={agregarSubtitulo} className="botones-nota" title='Subtítulo'><img src="images/t-botton.png" alt="" /></button>
                                    <button onClick={agregarParrafo} className="botones-nota" title='Párrafo'><img src="images/Aa-botton.png" alt="" /></button>
                                    <button onClick={handleClickEnNota} className="botones-nota">
                                    <img src="images/image-icon-botton.png" alt="Subir Imagen" />
                                    </button>
                                    {/* Input file oculto */}
                                    <input
                                    type="file"
                                    ref={inputFileRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChangeEnNota}
                                    accept="image/*"  // Acepta solo archivos de imagen
                                    />

                                    <button className="botones-nota"><img src="images/video-botton.png" alt="" /></button>
                                    </div>
                                )}
                            </div>
                        </div>


                        </div> 
                       
                        {/* Seccion columna izquierda del tutorial */}
                        <div className='col-2 columnaTutorial'>
                            <img src="/images/tutorialvideo.png" alt="Icono 1" className="icon me-2 icono_tusNotas" />
                        </div>
                        {/* fin seccion columna izquierda */}

                    </div>



                    {/* Modal para la imagen */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static" dialogClassName="custom-modal">
                        <Modal.Header className='modalHeader'>
                            <Modal.Title>
                                <div className='tituloModal'>Selecciona la posicion de la imagen</div>
                                </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='modalBody'>
                            <div className='subtitulo-modal'>Selecciona el recorte que se utilizara para los canales donde la imagen deba ser adaptada</div>
                            <div className='custom_image_modal'>
                            {image && (
                                <img
                                    ref={imageRef}
                                    src={image}
                                    alt="Imagen seleccionada"
                                    className='custom_image_modal'
                                />
                            )}
                            </div>
                        </Modal.Body>
                        <Modal.Footer className='modalFooter'>
                            <div className='row rowModalFooter'>
                                <div className='col text-align-center'>
                                <Button variant="none" onClick={() => setShowModal(false)} className='botonModalVolver'>
                                    Volver
                                </Button>
                                </div>
                                <div className='col text-align-center'>
                                    <Button variant="none" onClick={handleCrop} className='botonModalContinuar'>
                                        Continuar
                                    </Button>
                                </div>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default CrearNota;
