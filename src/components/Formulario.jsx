import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Formulario.css'; // Incluye aquí tu CSS personalizado si es necesario
import { updateEmail, updateContraseña } from '../redux/formularioSlice'; // Ajusta la ruta según sea necesario
import axios from 'axios';

const Formulario = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Despacha las acciones para guardar los datos en el store
        dispatch(updateEmail(email));
        dispatch(updateContraseña(contraseña));

        try {
            // Espera a que la promesa se resuelva
            const response = await axios.post("api/login", {
                usuario: "diego.digrazia@noticiasd.com",
                password: "Kjkszpj12344"
            }, 
            );

            // Maneja la respuesta de la API
            console.log('Respuesta:', response.status);
            
            // Puedes acceder al token y otros datos aquí
            if (response.data.status === "true" && response.data.item.token) {
                console.log('Token:', response.data.item.token);
                // Aquí puedes manejar el éxito del login, por ejemplo, guardar el token, redirigir, etc.
            } else {
                console.error('Error en los datos de la API:', response.data.message);
            }
        } catch (error) {
            // Maneja el error
            if (error.response) {
                // La solicitud se realizó y el servidor respondió con un código de estado que está fuera del rango de 2xx
                console.error('Error respuesta:', error.response.data);
                console.error('Código de estado:', error.response.status);
                console.error('Encabezados:', error.response.headers);
            } else if (error.request) {
                // La solicitud se realizó pero no se recibió respuesta
                console.error('Error solicitud:', error.request);
            } else {
                // Algo pasó al configurar la solicitud que lanzó un error
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row" id="imagenLogo"> {/* Centra vertical y horizontalmente */}
                <div className="col-6" id='imagen'>
                    <div className="image-container">
                        <img src="/images/foto-login.png" alt="Imagen de ejemplo" className="img-fluid" />
                    </div>
                </div>
                <div className="col-4" id='formulario'>
                    <div className="text-center mb-4">
                        <img src="/images/noticiasdlogo.png" alt="Imagen de ejemplo" className="img-fluid mb-4" id='logo-nd'/>
                        <h2>Bienvenidos</h2>
                        <h3>Ingresa tus datos para acceder a la plataforma</h3>
                    </div>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-3 emailbox">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="form-control" 
                                required 
                                placeholder='Ingresa tu email aquí' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 contraseña">
                            <label htmlFor="password" className="form-label">Contraseña:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="form-control" 
                                required 
                                placeholder='Ingresa tu contraseña aquí' 
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </div>
                        <button type="submit" id='iniciar_sesion'>Iniciar sesión</button>
                        <button type="button" id='iniciar_sesion_google'>Iniciar con tu cuenta de Google</button>
                        <button type="button" className="btn btn-link" id="olvide_contraseña">Olvidé mi contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Formulario;
