import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BajarContenidoPorIndice, setContenidoPorIndice, setTituloNota, SubirContenidoPorIndice } from '../../../redux/crearNotaSlice';
import BotoneraContenido from './botoneraContenido';

const ParrafoNota= ({indice}) => {
    const tituloRef = useRef(null);
    const tituloGlobalNota= useSelector((state) => state.crearNota.contenidoNota[indice][1]);
    const dispatch = useDispatch();
    

    const handleInputChange = (e) => {
      dispatch(setContenidoPorIndice([indice, e.target.value]))

      // Ajustar la altura del textarea al contenido
      const textarea = tituloRef.current;
      textarea.style.height = 'auto'; // Restablecer la altura temporalmente
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar a la altura del contenido
    };

    return (

      <span className = 'p-0'style={{ display: 'flex', alignItems: 'center' }}>
          <BotoneraContenido indice = {indice}/>

          <textarea 
          ref={tituloRef}
          className="inputTituloNota parrafoNota"
          type="text"
          placeholder="Escribe tu nota"
          value={tituloGlobalNota}
          onChange={handleInputChange}
          rows="1" // Empieza con una sola fila
          style={{ overflow: 'hidden' }} // Oculta la barra de desplazamiento
        ></textarea>
      </span>
    );
  };
export default ParrafoNota;
