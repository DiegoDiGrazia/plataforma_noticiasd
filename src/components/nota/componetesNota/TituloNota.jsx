import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';
import { useSelector, useDispatch } from 'react-redux';
import { setTituloNota } from '../../../redux/crearNotaSlice';

const TituloNota = ({ indice }) => {
    const tituloRef = useRef(null);
    const tituloGlobalNota = useSelector((state) => state.crearNota.tituloNota);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        dispatch(setTituloNota(e.target.value));

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
                placeholder="Escribí un Titulo para la nota"
                value={tituloGlobalNota}
                onChange={handleInputChange}
                rows="1" // Empieza con una sola fila
                style={{
                    overflow: 'hidden', // Oculta la barra de desplazamiento
                    resize: 'none', // Evita que el usuario cambie manualmente el tamaño
                }}
            ></textarea>
        </span>
    );
};

export default TituloNota;
