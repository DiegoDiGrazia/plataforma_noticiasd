import { createSlice } from '@reduxjs/toolkit';
import { periodoUltimoAño } from '../components/barplot/Barplot.jsx';

const notasSlice = createSlice({
  name: 'notas',
  initialState: {
    todasLasNotas : [],
    notasEnProgreso : [],
    notasFinalizadas : [],
    ultimaFechaCargadaNotas: "",

  },
  reducers: {
    setTodasLasNotas: (state, action) => {
      state.todasLasNotas = action.payload;
  },
  setNotasEnProgreso: (state, action) => {
    state.notasEnProgreso = action.payload;
  },
  setNotasFinalizadas: (state, action) => {
    state.notasFinalizadas = action.payload;
  },
  setultimaFechaCargadaNotas: (state, action) => {
    state.ultimaFechaCargadaNotas = action.payload;
  }

  }
});

export const { setTodasLasNotas, setNotasEnProgreso, setNotasFinalizadas, setultimaFechaCargadaNotas} = notasSlice.actions;
export default notasSlice.reducer;
