import { createSlice } from '@reduxjs/toolkit';
import { periodoUltimoAño } from '../components/barplot/Barplot.jsx';

const notasSlice = createSlice({
  name: 'notas',
  initialState: {
    todasLasNotas : [],
    notasEnProgreso : [],
    notasFinalizadas : [],

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
  }

  }
});

export const { setTodasLasNotas, setNotasEnProgreso, setNotasFinalizadas } = notasSlice.actions;
export default notasSlice.reducer;
