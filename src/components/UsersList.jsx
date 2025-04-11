// src/components/UsersList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UsersList.css'; 

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.example.com/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data); // Inicializamos el filtro con todos los usuarios
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  // Maneja el cambio en el campo de búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Resetear la página al buscar
  };

  // Calcular los usuarios que se mostrarán en la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generar los números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="users-list-container">
      <h2>Lista de Usuarios</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="users-list">
        {currentUsers.map((user) => (
          <li key={user.id} className="user-item">
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </li>
        ))}
      </ul>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
