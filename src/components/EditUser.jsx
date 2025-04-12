import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/EditUser.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    id: "",
    name: "",
    email: "",
    last_name: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`https://18.188.32.86/api/user/${id}`)
      .then(response => {
        const { id, name, email, last_name } = response.data;
        setUsuario({ id, name, email, last_name });
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar el usuario:", error);
        setMessage("No se pudo cargar la información del usuario.");
        setIsLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("Actualizando usuario...");

    axios.put(`https://18.188.32.86/api/actualizar/${id}`, usuario)
      .then(() => {
        setMessage("Actualización exitosa. Redirigiendo...");
        setTimeout(() => navigate("/users/usuarios"), 2000);
      })
      .catch(error => {
        console.error("Error al actualizar el usuario:", error);
        setMessage("Error al actualizar. Intenta nuevamente.");
        setIsUpdating(false);
      });
  };

  return (
    <div className="form-container">
      <h2>Editar Usuario</h2>

      {isLoading ? (
        <p className="loading-message">Cargando datos del usuario...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID</label>
          <input type="text" name="id" value={usuario.id} disabled />

          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" value={usuario.name} onChange={handleChange} required />

          <label htmlFor="email">Correo</label>
          <input type="email" name="email" value={usuario.email} onChange={handleChange} required />

          <label htmlFor="last_name">Apellido</label>
          <input type="text" name="last_name" value={usuario.last_name} onChange={handleChange} required />

          <div className="button-group">
            <button type="submit" disabled={isUpdating}>
              {isUpdating ? "Actualizando..." : "Actualizar Usuario"}
            </button>
            <button type="button" onClick={() => navigate("/users/usuarios")} className="cancel-button">
              Cancelar
            </button>
          </div>

          {message && <p className="status-message">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default EditUser;
