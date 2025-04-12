import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/EditUser.css"; // Asegúrate de tener este archivo CSS en la ruta correcta

const EditUser = () => {
    const { id_u } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        axios.get(`https://18.188.32.86/users/actualizarusuario/${id_u}`)
            .then(response => setUsuario(response.data))
            .catch(error => console.error(error));
    }, [id_u]);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://18.188.32.86/users/actualizarusuario/${id_u}`, usuario)
            .then(() => {
                alert("Usuario actualizado");
                navigate("/UserView");
            })
            .catch(error => console.error(error));
    };

    const handleRedirect = () => {
        navigate("/list_usuario");
    };

    return (
        <div className="edit-user-container">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit} className="edit-user-form">
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={usuario.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={usuario.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="text"
                        name="password"
                        value={usuario.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-button">Actualizar Usuario</button>
                    <button type="button" className="save-button" style={{ marginLeft: "10px", backgroundColor: "#6c757d" }} onClick={handleRedirect}>
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
