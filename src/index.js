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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Ruta para login */}
        <Route path="/" element={<Login />} />

        {/* Ruta para formulario de creación de usuarios */}
        <Route path="/formulario" element={<Formulario />} />

        {/* Lista de usuarios */}
        <Route path="/users/usuarios" element={<UsersList />} />

        {/* Ver detalles de usuario */}
        <Route path="/users/ver/:id" element={<UserDetails />} />

        {/* Editar usuario */}
        <Route path="/users/editar/:id" element={<EditUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
