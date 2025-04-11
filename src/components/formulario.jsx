import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "./css/Formulario.css"; // Asegúrate de que el archivo CSS esté correctamente importado

const Formulario = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://api.navtracker.xdn.com.mx/api/usuario/", usuario);
            alert("Usuario registrado correctamente");
            setUsuario({
                nombre: "",
                email: "",
                password: "",
            });
            navigate('/login'); 
        } catch (error) {
            console.error("Error al registrar usuario", error);
            alert("Error al registrar usuario");
        }
    };

    return (
        <div className="create-user-container">
            <h2 className="form-title">Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre" 
                        value={usuario.nombre} 
                        onChange={handleChange} 
                        required 
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={usuario.email} 
                        onChange={handleChange} 
                        required 
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        value={usuario.password} 
                        onChange={handleChange} 
                        required 
                        className="input-field"
                    />
                </div>

                <button type="submit" className="submit-button">
                    Registrar Usuario
                </button>
            </form>
        </div>
    );
};

export default Formulario;
