import React, { useEffect, useState } from "react";
import Calendar from "../../Componentes/Calendario/calendario";
import Cita from "../../Componentes/Calendario/cita";
import "../../Styles/calendario.css";

const CalendarioCitas = () => {
  const [citas, setCitas] = useState([]);
  const [nuevaCita, setNuevaCita] = useState({
    fechaHora: "",
    motivo: "",
    idCliente: "",
    idMascota: "",
  });

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const response = await fetch("http://localhost:5006/api/agendar-cita");
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Verificar si la respuesta es un array
      if (!Array.isArray(data)) {
        console.error("La respuesta de la API no es un array:", data);
        setCitas([]);
        return;
      }
      
      setCitas(data);
    } catch (error) {
      console.error("Error cargando citas:", error);
      setCitas([]); // Asegurar que siempre sea un array
    }
  };

  const handleDateClick = (info) => {
    setNuevaCita({ ...nuevaCita, fechaHora: info.dateStr });
  };

  const handleInputChange = (e) => {
    setNuevaCita({ ...nuevaCita, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5006/api/agendar-cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCita),
      });

      if (response.ok) {
        alert("Cita agendada con éxito! 🐾");
        setNuevaCita({ fechaHora: "", motivo: "", idCliente: "", idMascota: "" });
        await cargarCitas();
      } else {
        alert("Error al agendar la cita");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Convertir citas a eventos del calendario
  const calendarEvents = citas.map((cita) => ({
    title: cita.motivo,
    start: cita.fechaHora,
    extendedProps: {
      cliente: cita.idCliente,
      mascota: cita.idMascota
    }
  }));

  return (
    <div className="wrapper">
      <h1>📅 Calendario de Citas Veterinarias</h1>
      
      <Calendar
        events={calendarEvents}
        onDateClick={handleDateClick}
      />
      
      <Cita
        citaData={nuevaCita}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CalendarioCitas;