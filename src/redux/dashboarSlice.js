import { createSlice } from '@reduxjs/toolkit';
import { periodoUltimoAño } from '../components/barplot/Barplot';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    cliente: "",
    filtro: "Ultimo Año",
    periodos_api: periodoUltimoAño(),
  },
  reducers: {
    setFiltro: (state, action) => {
      state.filtro = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setFiltro, logout } = dashboardSlice.actions;
export default dashboardSlice.reducer;
