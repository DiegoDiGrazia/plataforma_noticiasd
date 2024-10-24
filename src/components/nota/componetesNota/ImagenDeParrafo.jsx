import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { DeleteContenidoPorIndice } from '../../../redux/crearNotaSlice';


const ImagenDeParrafo= ({ indice }) => {
    const imagen = useSelector((state) => state.crearNota.contenidoNota[indice])
    if (!imagen) {
        console.log(imagen[0], "Asdasd")
        return null; // Manejo de casos donde no hay imagen
    }
    const dispatch = useDispatch();

    const eliminarContenido = (indice) =>{
        dispatch(DeleteContenidoPorIndice(indice))
    }   

    return (
   
        <div>
            <span>
            <Button variant="none" onClick={() => eliminarContenido(indice)} className='botonEliminarContenido'>
                -
            </Button>
            </span>
            <img
            src={imagen[1]}
            alt="Imagen de parrafo"
            className='imagenRecortada'
            />
        </div>
        )
};


export default ImagenDeParrafo;
