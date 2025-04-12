import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";

const Login = () => {
    const [usuario, setUsuario] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                "https://18.188.32.86/users/login", // Asegúrate de que tu servidor esté activo
                usuario,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Respuesta de la API:", response.data);

            // Ajustado al backend Flask: el token se llama 'access_token'
            const token = response.data.access_token;

            if (token) {
                localStorage.setItem("token", token);
                alert("Inicio de sesión exitoso");
                navigate("/users/usuarios");
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                console.error("Respuesta con error:", error.response.data);
                setError(error.response.data.msg);
            } else if (error.request) {
                console.error("No se recibió respuesta del servidor:", error.request);
                setError("No se recibió respuesta del servidor");
            } else {
                console.error("Error inesperado:", error.message);
                setError("Error inesperado al iniciar sesión");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Inicio de Sesión</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input-field"
                            placeholder="Email"
                            value={usuario.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="input-field"
                            placeholder="Contraseña"
                            value={usuario.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
