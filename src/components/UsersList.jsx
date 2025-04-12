import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import './css/UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const navigate = useNavigate(); // Hook para redirigir al usuario

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://18.188.32.86/users/usuarios', {
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://3.145.18.237/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setUsers(users.filter(user => user.id !== id));
      setFilteredUsers(filteredUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleEdit = (id) => {
    // Redirigir al formulario de edición
    console.log(`Editar usuario con id: ${id}`);
    navigate(`/edit/${id}`); // Redirige a la página de edición
  };

  const handleView = (id) => {
    // Redirigir a la página de detalles del usuario
    console.log(`Ver detalles del usuario con id: ${id}`);
    navigate(`/user/${id}`); // Redirige a la página de ver detalles del usuario
  };

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
            <div className="user-actions">
              <button onClick={() => handleView(user.id)} className="view-button">Ver</button>
              <button onClick={() => handleEdit(user.id)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(user.id)} className="delete-button">Eliminar</button>
            </div>
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
