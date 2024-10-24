import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTituloNota } from '../../../redux/crearNotaSlice';
import { Button } from 'react-bootstrap';

import { DeleteContenidoPorIndice } from '../../../redux/crearNotaSlice';

const TituloNota= ({indice}) => {
    const tituloRef = useRef(null);
    const tituloGlobalNota= useSelector((state) => state.crearNota.tituloNota);
    const dispatch = useDispatch();
    
    const eliminarContenido = (indice) =>{
      dispatch(DeleteContenidoPorIndice(indice))
    }   
  
    const handleInputChange = (e) => {
      dispatch(setTituloNota(e.target.value))
  
      // Ajustar la altura del textarea al contenido
      const textarea = tituloRef.current;
      textarea.style.height = 'auto'; // Restablecer la altura temporalmente
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar a la altura del contenido
    };
  
    return (

      <span>
          <textarea 
          ref={tituloRef}
          className="inputTituloNota"
          type="text"
          placeholder="Escribí un Titulo para la nota"
          value={tituloGlobalNota}
          onChange={handleInputChange}
          rows="1" // Empieza con una sola fila
          style={{ overflow: 'hidden' }} // Oculta la barra de desplazamiento
        ></textarea>
      </span>
    );
};

export default TituloNota;
