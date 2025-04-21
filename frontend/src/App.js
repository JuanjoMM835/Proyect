import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./login-register/login";
import PerfilUsuario from "./login-register/perfilUsuario";
import Register from "./login-register/register";
import AgendarCita from "./servicios/AgendarCita";
import DesparaYVacuna from "./servicios/DesparaYVacuna";
import LinkedListComponent from "./servicios/LinkedListComponent";
import Peluqueria from "./servicios/Peluqueria";
import { default as RegistrarM, default as Service } from "./servicios/service";
import Veterinaria from "./veterinaria";
function App() {


  
  return (
    <Router>
      
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/veterinaria" element={<Veterinaria />} />
        <Route path="/servicios/service.js" element={<Service />} />
        <Route path = "/Registrar-Mascota" element={<RegistrarM/>}/>
        <Route path="/desparasitacion-vacunacion" element={<DesparaYVacuna/>}/>
        <Route path="/peluqueria-estetica" element={<Peluqueria/>}/>
        <Route path="/Agendar-Cita" element={<AgendarCita />} />
        <Route path="/galeria" element={<LinkedListComponent />} />
        <Route path="/consulta-informacion" element={<PerfilUsuario/>} />

      </Routes>
    </Router>

    
  );
  
  
}

export default App;
