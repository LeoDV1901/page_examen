import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // No olvides importar axios
import "./css/Login.css";
import https from "https"; // Importamos el módulo https

const Login = () => {
    const [usuario, setUsuario] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Agregado para el estado de carga
    const navigate = useNavigate();

    // Deshabilitar la verificación SSL solo en desarrollo
    if (process.env.NODE_ENV === "development") {
        axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // Iniciar estado de carga

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
            if (error.response) {
                // Si hay una respuesta de la API, manejar el error de respuesta
                console.error("Error de respuesta de la API:", error.response);
                setError("Hubo un problema al iniciar sesión. Intenta de nuevo.");
            } else {
                // Si no hay respuesta, manejar el error de conexión
                console.error("Error al intentar iniciar sesión:", error);
                setError("No se pudo conectar con el servidor. Verifica tu conexión.");
            }
        } finally {
            setLoading(false); // Finalizar estado de carga
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
