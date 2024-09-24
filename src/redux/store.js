import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./dashboarSlice.js";
import formularioSlice from "./formularioSlice.js";
import barplotSlice from "./barplotSlice.js";
import interaccionesPorNotaSlice from "./interaccionesPorNotaSlice.js";


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