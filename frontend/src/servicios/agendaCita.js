import { useState } from "react";
import "./estilosAgenda.css";
const Peluqueria = () => {
    const [tipo , setTipo] = useState("canina")

  const cortes =  {
    canina : [
    { nombre: "Corte Clásico", imagen: "corte1.jpg", precio: 15 },
    { nombre: "Corte Moderno", imagen: "corte2.jpg", precio: 20 },
    { nombre: "Corte Elegante", imagen: "corte3.jpg", precio: 25 },
    { nombre: "Corte Luxury", imagen: "corte4.jpg", precio: 95 },
    { nombre: "Corte poor", imagen: "corte5.jpg", precio: 45 },
    { nombre: "Corte Ovalado", imagen: "corte6.jpg", precio: 35 },
    { nombre: "Corte Clásico", imagen: "corte7.jpg", precio: 15 },
    { nombre: "Corte Moderno", imagen: "corte8.jpg", precio: 20 },
    { nombre: "Corte Elegante", imagen: "corte9.jpg", precio: 25 },
    { nombre: "Corte Luxury", imagen: "corte10.jpg", precio: 95 },
    { nombre: "Corte poor", imagen: "corte11.jpg", precio: 45 },
    
  ], 
felina :[
    { nombre: "Corte León", imagen: "felino1.jpg", precio: 18 },
    { nombre: "Corte Suave", imagen: "felino2.jpg", precio: 22 },
    { nombre: "Corte Esponjoso", imagen: "felino3.jpg", precio: 28 },
    { nombre: "Corte León", imagen: "felino1.jpg", precio: 18 },
    { nombre: "Corte Suave", imagen: "felino2.jpg", precio: 22 },
    { nombre: "Corte Esponjoso", imagen: "felino3.jpg", precio: 28 },
    { nombre: "Corte León", imagen: "felino1.jpg", precio: 18 },
    { nombre: "Corte Suave", imagen: "felino2.jpg", precio: 22 },
    { nombre: "Corte Esponjoso", imagen: "felino3.jpg", precio: 28 }





]
}
  

return (
  <div className="peluqueria-container">
    <header className="peluqueria-header">
        🐾 Peluquería {tipo === "canina" ? "Canina" : "Felina"}
    </header>

    <button className="peluqueria-button" onClick={() => setTipo(tipo === "canina" ? "felina" : "canina")}>
        Cambiar a Peluquería {tipo === "canina" ? "Felina 🐱" : "Canina 🐶"}
    </button>

    <section id="galeria" className="peluqueria-gallery">
        <h2>Estilos Disponibles</h2>
        {cortes[tipo].map((corte, index) => (
            <div key={index} className="peluqueria-card">
                <img src={`/cortes/${corte.imagen}`} alt={corte.nombre} />
                <h3 className="peluqueria-title">{corte.nombre}</h3>
                <p className="peluqueria-price">Precio: ${corte.precio}</p>
            </div>
        ))}
    </section>
</div>
  );
};


export default Peluqueria;
