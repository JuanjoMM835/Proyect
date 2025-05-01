import { motion } from "framer-motion";
import { Mail, PawPrint, Phone } from "lucide-react";
import React from "react";
import "./veterinaria.css";




const VetButton = ({ children, link }) => (
  <a href={link} className="vet-btn__container">
    <button className="vet-btn">
      <PawPrint className="vet-btn__icon" size={24} />
      {children}
    </button>
  </a>
);

const VeterinariaAnimales = () => {
  return (
    <div className="vet-main">
      <header className="vet-main__header">
        🐾 Veterinaria Amigos Peludos
      </header>
      
      <nav className="vet-nav">
        <a href="#servicios" className="vet-nav__item">Servicios</a>
        <a href="#galeria" className="vet-nav__item">Galería</a>
        <a href="#contacto" className="vet-nav__item">Contacto</a>
      </nav>
      
      <motion.div className="vet-content">
        <section id="servicios" className="vet-section">
          <h2 className="vet-section__title">Nuestros Servicios</h2>
          <div className="vet-services">
            <VetButton link="/desparasitacion-vacunacion">Vacunación y desparasitación</VetButton>
            <VetButton link="/peluqueria-estetica">Peluquería y estética canina y felina</VetButton>
            <VetButton link="/:idUsuario">Información de tu mascota</VetButton>
            <VetButton link="/registrar-mascota">Registrar Mascota</VetButton>
            <VetButton link="/galeria">Galería Mascota</VetButton>
          </div>
        </section>

        <section id="galeria" className="vet-section">
          <h2 className="vet-section__title">Galería</h2>
          <div className="vet-gallery">
            {["Perrito.jpg", "imagen2.jpg", "imagen4.jpg"].map((image, index) => (
              <div key={index} className="vet-gallery__card">
                <img src={`/images/${image}`} alt="Mascota feliz" className="vet-gallery__img" />
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="vet-section">
          <h2 className="vet-section__title">Contacto</h2>
          <p className="vet-contact__info"><Mail className="vet-contact__icon" /> contacto@amigospeludos.com</p>
          <p className="vet-contact__info"><Phone className="vet-contact__icon" /> +123 456 789</p>
          <VetButton link="/Agendar-Cita">Agendar Cita</VetButton>
          
        </section>
      </motion.div>
      
      <footer className="vet-footer">Veterinaria Amigos Peludos © 2025</footer>
    </div>
  );
};
export default VeterinariaAnimales;