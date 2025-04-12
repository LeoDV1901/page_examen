import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/UsersList.css';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://18.188.32.86/users/usuario/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del usuario:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div className="user-details-container">
      <h2>Detalles del Usuario</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetails;
