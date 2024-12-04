import { createSlice } from '@reduxjs/toolkit';
import { periodoUltimoAño } from '../components/barplot/Barplot.jsx';

const notasSlice = createSlice({
  name: 'notas',
  initialState: {
    todasLasNotas : [],
    notasEnRevision : [],
    notasEnBorrador : [],
    notasEliminadas : [],
    notasPublicadas : [],
    ultimaFechaCargadaNotas: {"PUBLICADAS": "", "EN REVISION": "","todas": ""},

  },
  reducers: {
    setTodasLasNotas: (state, action) => {
      state.todasLasNotas = action.payload;
  },
  setNotasEnRevision: (state, action) => {
    state.notasEnRevision = action.payload;
  },
  setNotasPublicadas: (state, action) => {
    state.notasPublicadas = action.payload;
  },
  setNotasBorrador: (state, action) => {
    state.notasEnBorrador = action.payload;
  },
  setNotasEliminadas: (state, action) => {
    state.notasEliminadas = action.payload;
  },
  setultimaFechaCargadaNotas: (state, action) => {
    const { categoria, dia } = action.payload;  // Desestructurar categoria y dia
    state.ultimaFechaCargadaNotas[categoria] = dia;  // Usar categoria como clave
  }

  }
});

export const { setTodasLasNotas, setNotasEliminadas, setNotasEnRevision,setNotasPublicadas, setultimaFechaCargadaNotas, setNotasBorrador} = notasSlice.actions;
export default notasSlice.reducer;
