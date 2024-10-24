import { createSlice } from '@reduxjs/toolkit';

const crearNotaSlice = createSlice({
  name: 'crearNota',
  initialState: {
    tituloNota : "",
    contenidoNota :[],
  },
  reducers: {
    setTituloNota: (state, action) => {
      state.tituloNota = action.payload;
    },
    setContenidoNota: (state, action) => { /// aca guardo las imagenes, subtitulos y parrafos
        state.contenidoNota.push(action.payload)
    },
    DeleteContenidoPorIndice: (state, action) =>{ ///action.payload es el indice 
        state.contenidoNota.splice(action.payload, 1)
    },

    ///en action.payload, se aloja contenido el indice
    /// y el contenido con este formato [indice, contenido]
    setContenidoPorIndice: (state, action) =>{
      const indice = action.payload[0];
      const contenido = action.payload[1];
      state.contenidoNota[indice][1] = contenido;
    }

    }
});

export const { setTituloNota, setContenidoNota, DeleteContenidoPorIndice, setContenidoPorIndice } = crearNotaSlice.actions;
export default crearNotaSlice.reducer;
