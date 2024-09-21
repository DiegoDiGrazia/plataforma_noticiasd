import { createSlice } from '@reduxjs/toolkit';
import { periodoUltimoAño } from '../components/barplot/Barplot';

const interaccionesPorNota = createSlice({
  name: 'interaccionesPorNota',
  initialState: {
    notasMayorInteraccion : [],
    mediosMayorInteraccion :[],
  },
  reducers: {
    setNotasMayorInteraccion: (state, action) => {
      state.notasMayorInteraccion = action.payload;
    },
    setMediosMayorInteraccion: (state, action) => {
      state.mediosMayorInteraccion = action.payload;
    },

  },
});

export const { setNotasMayorInteraccion, setMediosMayorInteraccion } = interaccionesPorNota.actions;
export default interaccionesPorNota.reducer;