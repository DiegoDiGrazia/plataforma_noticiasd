import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCopete, setTituloNota } from '../../../redux/crearNotaSlice';
import { Button } from 'react-bootstrap';

import { DeleteContenidoPorIndice } from '../../../redux/crearNotaSlice';

const CopeteNota= ({indice}) => {
    const tituloRef = useRef(null);
    const tituloGlobalNota= useSelector((state) => state.crearNota.copete);
    const dispatch = useDispatch();
    
    const handleInputChange = (e) => {
      dispatch(setCopete(e.target.value))
        // Ajustar la altura del textarea al contenido
        ajustarAltura();
    };

    const ajustarAltura = () => {
        const textarea = tituloRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Restablecer altura para recalcular
            textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar a la altura del contenido
        }
    };

    // Ajustar la altura al cargar contenido existente
    useEffect(() => {
        ajustarAltura();
    }, [tituloGlobalNota]);
    return (

      <span>
          <textarea 
          ref={tituloRef}
          className="inputTituloNota marginTitulo"
          type="text"
          placeholder="BAJADA"
          value={tituloGlobalNota}
          onChange={handleInputChange}
          rows="1" // Empieza con una sola fila
          style={{ overflow: 'hidden', fontSize: "24px" }} // Oculta la barra de desplazamiento
        ></textarea>
      </span>
    );
};

export default CopeteNota;
