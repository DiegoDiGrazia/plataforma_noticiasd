import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'cropperjs/dist/cropper.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setTodosLosClientes } from '../../redux/dashboardSlice';
import axios from 'axios';
import { updateCliente, updateIdCliente } from '../../redux/formularioSlice';
import './Dashboard.css';


const SelectorCliente= () => {
    const nombreCliente = useSelector((state) => state.formulario.cliente)
    const TOKEN = useSelector((state) => state.formulario.token)
    const todosLosClientes = useSelector((state) => state.dashboard.todosLosClientes) || []
    
        const dispatch = useDispatch(); // Agrega esto al inicio del componente

        useEffect(() => {
            if (true) { // Verifica si el arreglo está vacío
                axios.post(
                    "app_obtener_clientes",
                    {
                        token: TOKEN,
                        cliente: "",
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                .then((response) => {
                    console.log('Respuesta:', response.status);
        
                    if (response.data.status === "true") {
                        console.log(response.data);
                        dispatch(setTodosLosClientes(response.data.item)); // Usa dispatch aquí
                    } else {
                        console.error('Error en la respuesta de la API:', response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error al hacer la solicitud:', error);
                });
            }
            console.log(todosLosClientes, "todos los clientes")
        }, [TOKEN, dispatch]); // Agrega dependencias relevantes

    const editarCliente =(cliente) =>{
        dispatch(updateCliente(cliente.name))
        dispatch(updateIdCliente(cliente.id))
    }

    return (

        <div className="dropdown">
    <h4 id="saludo">Hola</h4>
            <button 
                className="btn custom-dropdown-button dropdown-toggle boton_cliente mb-2 ml-5 " 
                type="button" 
                id="dropdownMenuButton1" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
            >
                {nombreCliente}
            </button>
    <ul className="dropdown-menu listaClientes" aria-labelledby="dropdownMenuButton1">

        {/* Renderiza los clientes dinámicamente */}
        {todosLosClientes.map((cliente) => (
            <li key={cliente.id}>
                <button 
                    className="dropdown-item" 
                    onClick={() => editarCliente(cliente)}
                >
                    {cliente.name}
                </button>
            </li>
        ))}

    </ul>
</div>

    );
};

export default SelectorCliente;
