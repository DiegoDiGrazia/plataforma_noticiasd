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
    DeleteContenidoPorIndice: (state, action) =>{ /// action payload
        state.contenidoNota.splice(action.payload, 1)
    },
    SubirContenidoPorIndice: (state, action) => { 
      const index = action.payload;
      if (index >= 0 && index < state.contenidoNota.length - 1) {
        // Realiza el swap entre el elemento actual y el siguiente
        const temp = state.contenidoNota[index];
        state.contenidoNota[index] = state.contenidoNota[index + 1];
        state.contenidoNota[index + 1] = temp;
      }
    },
    BajarContenidoPorIndice: (state, action) => { 
      const index = action.payload;
      if (index > 0 && index < state.contenidoNota.length) {
        // Realiza el swap entre el elemento actual y el anterior
        const temp = state.contenidoNota[index];
        state.contenidoNota[index] = state.contenidoNota[index - 1];
        state.contenidoNota[index - 1] = temp;
      }
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

export const { setTituloNota, setContenidoNota, DeleteContenidoPorIndice, setContenidoPorIndice,
                SubirContenidoPorIndice, BajarContenidoPorIndice
 } = crearNotaSlice.actions;
export default crearNotaSlice.reducer;
