import React, { useEffect, useState } from "react";

const InfoMascotas = ({ userId }) => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        
        const response = await fetch(`/api/mascotas?userId=${userId}`);
        const data = await response.json();
        
        if (response.ok) {
          setMascotas(data);
        } else {
          setError("No se pudieron cargar las mascotas.");
        }
      } catch (err) {
        setError("Error al conectarse al servidor.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMascotas();
    }
  }, [userId]);

  if (loading) return <p>Cargando mascotas...</p>;
  if (error) return <p className="error">{error}</p>;
  if (mascotas.length === 0) return <p>No tienes mascotas registradas.</p>;

  return (
    <div className="info-mascotas">
      <h3>Mis Mascotas</h3>
      <ul>
        {mascotas.map((mascota) => (
          <li key={mascota.id}>
            <strong>{mascota.nombre}</strong> - {mascota.raza} ({mascota.edad} años)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoMascotas;