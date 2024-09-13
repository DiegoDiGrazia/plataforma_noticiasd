import { configureStore } from "@reduxjs/toolkit";
import  usersReducer  from "./usersSlice"
import  productsReducers  from "./productsSlice"
import authReducers from "./authSlice";
import productsSlice from "./productsSlice";
import Formulario from "../components/login/Formulario";
import formularioSlice from "./formularioSlice";


const store= configureStore({
    reducer: {
            users: usersReducer, //el userReducers vienen de 
            products : productsReducers,
            auth : authReducers,
            formulario : formularioSlice
        },
    }
)

export default store;