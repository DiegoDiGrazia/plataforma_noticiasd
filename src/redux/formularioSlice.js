import { createSlice } from "@reduxjs/toolkit";
import { ESModulesRunner } from "vite/runtime";


const formularioSlice = createSlice({
    name: "formulario",
    initialState: {
        email: "",
        contraseña: ""
    },
    reducers: {
        updateEmail: (state, action) => {
            state.email = action.payload;  // Asignación directa para cadenas de texto
        },
        updateContraseña: (state, action) => {
            state.contraseña = action.payload;  // Asignación directa para cadenas de texto
        }
    }
});

export const { updateEmail, updateContraseña } = formularioSlice.actions;
export default formularioSlice.reducer;