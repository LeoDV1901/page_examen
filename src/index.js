import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Formulario from './components/formulario';
import Login from './components/login';
import UsersList from './components/UsersList';
import UserDetails from './components/UserView';
import EditUser from './components/EditUser';

// Usamos createRoot para renderizar la aplicación en React 18 y posterior
const root = ReactDOM.createRoot(document.getElementById('root'));

// Envolvemos el Router dentro de createRoot para tener el contexto de enrutamiento en toda la app
root.render(
  <React.StrictMode>
    <Router> {/* El Router es el contenedor que maneja las rutas */}
      <Routes> {/* Configuramos las rutas */}
        <Route path="/formulario" element={<Formulario />} /> {/* Ruta para el formulario */}
        <Route path="/" element={<Login />} /> {/* Ruta para el login */}
        <Route path="/Users" element={<UsersList /> }/>
        <Route path="/Views" element={<UserDetails />} /> {/* Ruta para el login */}
        <Route path="/user/${id}" element={<EditUser /> }/>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
