import React, { StrictMode } from 'react'; // Añade React aquí
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js'; // Asegúrate de que la ruta sea correcta

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>
);