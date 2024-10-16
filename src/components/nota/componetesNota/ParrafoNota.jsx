import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';

const ParrafoNota= () => {
    const [tituloNota, setTituloNota] = useState('');
    const tituloRef = useRef(null);
  
    const handleInputChange = (e) => {
      setTituloNota(e.target.value);
  
      // Ajustar la altura del textarea al contenido
      const textarea = tituloRef.current;
      textarea.style.height = 'auto'; // Restablecer la altura temporalmente
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar a la altura del contenido
    };
  
    return (
        <textarea
        ref={tituloRef}
        className="inputTituloNota"
        type="text"
        placeholder="Escribí un título para la nota"
        value={tituloNota}
        onChange={handleInputChange}
        rows="1" // Empieza con una sola fila
        style={{ overflow: 'hidden' }} // Oculta la barra de desplazamiento
      ></textarea>
    );
};

export default ParrafoNota;
