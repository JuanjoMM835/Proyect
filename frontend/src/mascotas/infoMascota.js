// components/Mascotas.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const idUsuario = localStorage.getItem('idUsuario');
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:5006/api/:idUsuario/${idUsuario}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        
        if (response.ok) {
          setMascotas(data.mascotas);
          if (data.mensaje) setError(data.mensaje);
        } else {
          setError('Error al cargar mascotas');
        }
        
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, []);

  if (loading) return <div className="loading">Cargando mascotas... 🐾</div>;

  return (
    <div className="mascotas-container">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="error-message"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <h2>Tus Mascotas 🐶</h2>
      
      {mascotas.length > 0 ? (
        <div className="mascotas-grid">
          {mascotas.map((mascota) => (
            <motion.div
              key={mascota.id}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mascota-card"
            >
              <h3>{mascota.nombre}</h3>
              <p>Especie: {mascota.especie}</p>
              <p>Edad: {mascota.edad} años</p>
              <p>Edad: {mascota.raza} raza</p>
            </motion.div>
          ))}
        </div>
      ) : (
        !error && <div className="sin-mascotas">No tienes mascotas registradas 😿</div>
      )}
    </div>
  );
};

export default Mascotas;