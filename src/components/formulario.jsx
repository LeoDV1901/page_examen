import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'; 
import './css/Formulario.css'; 

const Formulario = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const encryptPassword = (password) => {
    // Generamos un "salt" y encriptamos la contraseña
    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const encryptedPassword = encryptPassword(password);

    try {
      const response = await axios.post(
        'https://api.example.com/users', // URL de la API
        { name, email, password: encryptedPassword }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token de autorización
          },
        }
      );
      alert('Usuario creado exitosamente');
    } catch (error) {
      alert('Error creando usuario');
    }
  };

  return (
    <div className="create-user-container">
      <form className="create-user-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Crear Usuario</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default Formulario;
