import { createSlice } from '@reduxjs/toolkit';
import { periodoUltimoAño } from '../components/barplot/Barplot.jsx';

const notasSlice = createSlice({
  name: 'notas',
  initialState: {
    todasLasNotas : []

  },
  reducers: {
    setTodasLasNotas: (state, action) => {
      state.todasLasNotas = action.payload;
  },
}
});

export const { setTodasLasNotas } = notasSlice.actions;
export default notasSlice.reducer;
