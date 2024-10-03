import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./dashboardSlice.js";
import formularioSlice from "./formularioSlice.js";
import barplotSlice from "./barplotSlice.js";
import interaccionesPorNotaSlice from "./interaccionesPorNotaSlice.js";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import notasSlice from "./notasSlice.js";

// Combina todos los slices en un rootReducer
const rootReducer = combineReducers({
    formulario: formularioSlice,
    barplot: barplotSlice,
    dashboard: dashboardSlice,
    interaccionesPorNota: interaccionesPorNotaSlice,
    notas: notasSlice,
});

// Configuración de Redux Persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Usando AsyncStorage para React Native
};

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer, // Usa el reducer persistido
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignora las acciones de persistencia que contienen valores no serializables
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
