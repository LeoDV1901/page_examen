import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";

// Configuración para deshabilitar la verificación SSL en desarrollo
if (process.env.NODE_ENV === "development") {
  axios.defaults.httpsAgent = new (require('https').Agent)({ rejectUnauthorized: false });
}

const Login = () => {
    const [usuario, setUsuario] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post("https://leodv.duckdns.org/login", usuario);
            console.log("Respuesta de la API:", response.data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("Inicio de sesión exitoso");
                navigate("/perfil");
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error);
            setError("Hubo un problema al iniciar sesión. Intenta de nuevo.");
        } finally {
            setLoading(false);
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
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Iniciando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
