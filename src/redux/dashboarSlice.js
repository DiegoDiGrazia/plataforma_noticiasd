import { createSlice } from '@reduxjs/toolkit';
import { periodoUltimoAño } from '../components/barplot/Barplot.jsx';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    filtro: "Ultimo Año",
    periodos_api: periodoUltimoAño(),
    desde: "", 
    hasta: "",
  },
  reducers: {
    setFiltro: (state, action) => {
      state.filtro = action.payload;
    },
    setFechaDesde: (state) => {
      state.desde = action.payload;
    },
    setFechaHasta: (state) => {
      state.desde = action.payload;
    },
  },
});

export const { setFiltro, setFechaDesde, setFechaHasta } = dashboardSlice.actions;
export default dashboardSlice.reducer;
