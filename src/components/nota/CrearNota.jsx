import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button, Modal } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar';
import "./nota.css";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const CrearNota = () => {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [cropper, setCropper] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);

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
                aspectRatio: NaN, // Permite cualquier proporción
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
                    <div className='row notaTutorial'>
                        {!croppedImage &&
                        <div className='col-8 columnaNota'>
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
                        <   div className='col-8'>
                                <div className="mt-3">
                                    <img
                                        src={croppedImage}
                                        alt="Imagen recortada"
                                        style={{ display: 'block', maxWidth: '100%' }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className='col'>
                            <img src="/images/tutorialvideo.png" alt="Icono 1" className="icon me-2 icono_tusNotas" />
                        </div>
                    </div>
                    
                    {/* Modal para la imagen */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static" dialogClassName="custom-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>Selecciona la posicion de la imagen</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>123123123</div>
                            {image && (
                                <img
                                    ref={imageRef}
                                    src={image}
                                    alt="Imagen seleccionada"
                                    style={{ display: 'block', maxWidth: '100%' }}
                                />
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleCrop}>
                                Recortar Imagen
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default CrearNota;
