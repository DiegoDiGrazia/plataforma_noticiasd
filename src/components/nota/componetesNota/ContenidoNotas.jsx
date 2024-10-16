import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';

const ContenidoNota= () => {
    return (
        <textarea  className="inputTituloNota" type="text" placeholder="Escribi tu nota"></textarea >
    );
};

export default ContenidoNota;
