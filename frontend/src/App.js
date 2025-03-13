import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./login-register/login";
import Register from "./login-register/register";
import Veterinaria from "./veterinaria";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/veterinaria" element={<Veterinaria />} />
      </Routes>
    </Router>
  );
}

export default App;
