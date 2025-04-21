// Peluqueria.jsx
import { Calendar, Scissors, Star } from "lucide-react";
import { useState } from "react";
import "./estilosPeluqueria.css";
import { CorteStrategies } from "./strategies";

const Peluqueria = () => {
  const [tipo, setTipo] = useState("canina");
  const strategy = CorteStrategies[tipo];

  // Función para dividir el array en grupos de 3 (podría moverse a un helper)
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const cortesDivididos = chunkArray(strategy.getCortes(), 3);

  return (
    <div className="peluqueria-rows">
      <header className="rows-header">
        <div className="header-content">
          <Scissors size={36} className="header-icon" />
          <div>
            <h1>Peluquería Profesional</h1>
            <p className="subtitle">{strategy.getTipo()}</p>
          </div>
        </div>
        
        <div className="toggle-container">
          {Object.keys(CorteStrategies).map((key) => (
            <button
              key={key}
              className={`toggle-button ${tipo === key ? "active" : ""}`}
              onClick={() => setTipo(key)}
            >
              {CorteStrategies[key].getIcon()}
              {CorteStrategies[key].getTipo()}
            </button>
          ))}
        </div>
      </header>

      <main className="rows-main">
        <div className="section-header">
          <h2 className="section-title">
            Nuestros Cortes Exclusivos
          </h2>
          <p className="section-subtitle">{strategy.getDescription()}</p>
        </div>
        
        {/* Renderizado de cortes (igual que en tu original) */}
        <div className="cortes-rows-container">
          {cortesDivididos.map((fila, indexFila) => (
            <div key={indexFila} className="corte-row">
              {fila.map((corte, indexCorte) => (
                <CorteCard key={indexCorte} corte={corte} />
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Componente CorteCard separado para mejor legibilidad
const CorteCard = ({ corte }) => (
  <article className={`corte-card ${corte.destacado ? "featured" : ""}`}>
    {corte.destacado && (
      <div className="card-badge">
        <Star size={16} />
        Popular
      </div>
    )}
    <div className="image-container">
      <img 
        src={`/cortes/${corte.imagen}`} 
        alt={corte.nombre} 
        loading="eager"
      />
      <div className="image-overlay"></div>
    </div>
    <div className="card-content">
      <h3>{corte.nombre}</h3>
      <div className="price-container">
        <span className="price">${corte.precio}</span>
      </div>
      <button className="agendar-button">
        <Calendar size={18} />
        Agendar
      </button>
    </div>
  </article>
);

export default Peluqueria;