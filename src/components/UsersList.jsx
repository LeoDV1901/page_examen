import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://18.188.32.86/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
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
      await axios.delete(`https://18.188.32.86/api/eliminar/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const updatedList = users.filter(user => user.id !== id);
      setUsers(updatedList);
      setFilteredUsers(updatedList);
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/editar/${id}`);
  };

  const handleView = (id) => {
    navigate(`/users/ver/${id}`);
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
