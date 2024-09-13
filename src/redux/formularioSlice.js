import { createSlice } from "@reduxjs/toolkit";
import { ESModulesRunner } from "vite/runtime";


const formularioSlice = createSlice({
    name: "formulario",
    initialState: {
        email: "",
        contraseña: "",
        token: "",
        status: "",
        codigoRecuperacion : ""

    },
    reducers: {
        updateEmail: (state, action) => {
            state.email = action.payload;  // Asignación directa para cadenas de texto
        },
        updateContraseña: (state, action) => {
            state.contraseña = action.payload;  // Asignación directa para cadenas de texto
        },
        updateToken: (state, action) => {
            state.token = action.payload;  // Asignación directa para cadenas de texto
        },
        updateStatus: (state, action) => {
            state.status = action.payload;  // Asignación directa para cadenas de texto
        },
        updateCodigoRecuperacion: (state, action) => {
            state.codigoRecuperacion = action.payload;  // Asignación directa para cadenas de texto
        },
    }
});

export const { updateEmail, updateContraseña, updateCodigoRecuperacion, updateToken } = formularioSlice.actions;
export default formularioSlice.reducer;