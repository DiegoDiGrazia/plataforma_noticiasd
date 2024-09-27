import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./dashboardSlice.js";
import formularioSlice from "./formularioSlice.js";
import barplotSlice from "./barplotSlice.js";
import interaccionesPorNotaSlice from "./interaccionesPorNotaSlice.js";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { combineReducers } from 'redux'; // Para combinar reducers

// Combina todos los slices en un rootReducer
const rootReducer = combineReducers({
    formulario: formularioSlice,
    barplot: barplotSlice,
    dashboard: dashboardSlice,
    interaccionesPorNota: interaccionesPorNotaSlice
});

// Configuración de Redux Persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Corregido aquí
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer, // Usa el reducer persistido
});

export const persistor = persistStore(store);
export default store;
