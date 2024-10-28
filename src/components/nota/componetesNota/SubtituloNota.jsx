import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setContenidoPorIndice, setTituloNota } from '../../../redux/crearNotaSlice';
import { Button } from 'react-bootstrap';
import { DeleteContenidoPorIndice } from '../../../redux/crearNotaSlice';
import { SubirContenidoPorIndice, BajarContenidoPorIndice } from '../../../redux/crearNotaSlice';
import BotoneraContenido from './botoneraContenido';

const SubtituloNota= ({indice}) => {
    const tituloRef = useRef(null);
    const tituloGlobalNota= useSelector((state) => state.crearNota.contenidoNota[indice][1]);
    const dispatch = useDispatch();
    
    const eliminarContenido = (indice) =>{
      dispatch(DeleteContenidoPorIndice(indice))
    }   
    const SubirUnaPosicionContenido = (indice) =>{
      dispatch(SubirContenidoPorIndice(indice))
    }   
    const BajarUnaPosicionContenido = (indice) =>{
      dispatch(BajarContenidoPorIndice(indice))
    }   

    const handleInputChange = (e) => {
      dispatch(setContenidoPorIndice([indice, e.target.value]))

      // Ajustar la altura del textarea al contenido
      const textarea = tituloRef.current;
      textarea.style.height = 'auto'; // Restablecer la altura temporalmente
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar a la altura del contenido
    };

    return (

      <span  className = 'p-0' style={{ display: 'flex', alignItems: 'center' }}>
          <BotoneraContenido indice = {indice}/>
          <textarea 
          ref={tituloRef}
          className="inputTituloNota subtituloNota"
          type="text"
          placeholder="un subtitulo"
          value={tituloGlobalNota}
          onChange={handleInputChange}
          rows="1" // Empieza con una sola fila
          style={{ overflow: 'hidden' }} // Oculta la barra de desplazamiento
        ></textarea>
      </span>
    );
  };
export default SubtituloNota;
