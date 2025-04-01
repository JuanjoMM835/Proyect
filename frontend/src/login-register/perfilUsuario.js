import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const PerfilUsuario = () => {
  const [user, setUser] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [showMascotas, setShowMascotas] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener datos del usuario y mascotas
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // 1. Obtener datos del usuario
        const userResponse = await fetch("http://localhost:5006/api/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userResponse.ok) throw new Error("Error al cargar perfil");
        const userData = await userResponse.json();
        setUser(userData);

        // 2. Obtener mascotas del usuario
        const mascotasResponse = await fetch(
          `http://localhost:5006/api/mascotas?id_cliente=${userData.id}`, // ¡Corregido el signo =!
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!mascotasResponse.ok) throw new Error("Error al cargar mascotas");
        const mascotasData = await mascotasResponse.json();
        setMascotas(mascotasData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No se encontraron datos del usuario.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hola, {user.nombre}!</h2>
      <button onClick={() => setShowMascotas(!showMascotas)}>
        {showMascotas ? "Ocultar mascotas" : "Ver mis mascotas"}
      </button>

      {showMascotas && (
        <div>
          <h3>Mis Mascotas</h3>
          {mascotas.length === 0 ? (
            <p>No tienes mascotas registradas.</p>
          ) : (
            <ul>
              {mascotas.map((mascota) => (
                <li key={mascota.id}>
                  <strong>{mascota.nombre}</strong> - {mascota.raza} ({mascota.edad} años)
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default PerfilUsuario;