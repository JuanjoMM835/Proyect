import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState } from "react";
import '../Styles/styles.css';

const CalendarioCitas = () => {
  const [citas, setCitas] = useState([]);
  const [nuevaCita, setNuevaCita] = useState({
    fechaHora: "",
    motivo: "",
    idCliente: "",
    idMascota: "",
  });

  useEffect(() => {
    fetch("http://localhost:5006/api/citas")
      .then((res) => res.json())
      .then((data) => setCitas(data))
      .catch((err) => console.error("Error cargando citas:", err));
  }, []);

  const handleDateClick = (info) => {
    setNuevaCita({ ...nuevaCita, fechaHora: info.dateStr });
  };

  const handleInputChange = (e) => {
    setNuevaCita({ ...nuevaCita, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5006/api/agendar-cita", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaCita),
    });

    if (response.ok) {
      alert("Cita agendada con éxito! 🐾");
      setNuevaCita({ fechaHora: "", motivo: "", idCliente: "", idMascota: "" });
      window.location.reload();
    } else {
      alert("Error al agendar la cita");
    }
  };

  return (
    <div className="wrapper">
      <div>
        <h1>📅 Calendario de Citas Veterinarias</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={citas.map((cita) => ({
            title: cita.motivo,
            start: cita.fechaHora,
          }))}
        />
      </div>
  
      <div>
        <h2>Agendar Cita</h2>
        <form onSubmit={handleSubmit}>
          <label>Fecha y Hora:</label>
          <input
            type="datetime-local"
            name="fechaHora"
            value={nuevaCita.fechaHora}
            onChange={handleInputChange}
            required
          />
          <label>Motivo:</label>
          <input
            type="text"
            name="motivo"
            value={nuevaCita.motivo}
            onChange={handleInputChange}
            required
          />
          <label>ID Cliente:</label>
          <input
            type="text"
            name="idCliente"
            value={nuevaCita.idCliente}
            onChange={handleInputChange}
            required
          />
          <label>ID Mascota:</label>
          <input
            type="text"
            name="idMascota"
            value={nuevaCita.idMascota}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Agendar</button>
        </form>
      </div>
    </div>
  );
};

export default CalendarioCitas;