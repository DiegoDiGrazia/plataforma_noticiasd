import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';

const SubtituloNota= () => {
    return (
        <textarea  className="inputTituloNota" type="text" placeholder="Escribi un Subtitulo"></textarea >
    );
};

export default SubtituloNota;
