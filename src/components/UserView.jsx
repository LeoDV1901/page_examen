import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://18.188.32.86/users/usuario/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener detalles del usuario:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={styles.message}>Cargando...</div>;
  if (!user) return <div style={styles.error}>Usuario no encontrado</div>;

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Detalles del Usuario</h2>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Apellido:</strong> {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundImage: "url('/public/fondo.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    fontFamily: "'Arial', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
  },
  container: {
    background: "rgba(255, 255, 255, 0.7)",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "40px 60px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "left",
    animation: "fadeInUp 0.6s ease-out",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "30px",
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
    fontFamily: "Arial, sans-serif",
    paddingTop: "50px"
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
    fontFamily: "Arial, sans-serif",
    paddingTop: "50px"
  }
};

export default UserDetails;
