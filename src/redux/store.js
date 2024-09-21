import { configureStore } from "@reduxjs/toolkit";
import  usersReducer  from "./usersSlice"
import  productsReducers  from "./productsSlice"
import dashboardSlice from "./dashboarSlice";
import formularioSlice from "./formularioSlice";
import barplotSlice from "./barplotSlice";
import interaccionesPorNotaSlice from "./interaccionesPorNotaSlice";


const store= configureStore({
    reducer: {
            formulario : formularioSlice,
            barplot : barplotSlice,
            dashboard: dashboardSlice,
            interaccionesPorNota : interaccionesPorNotaSlice
        },
    }
)

export default store;