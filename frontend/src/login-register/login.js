import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/loginmessage.css";
import "./login.css";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5006/api/inicio-sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, contrasena }),
    });

    const data = await response.json();
    if (response.ok) {
      setShowSuccess(true);
      localStorage.setItem("token", data.token);
      setTimeout(() => navigate("/veterinaria"), 2000);
    } else {
      setErrorMessage(data.error || "Error desconocido");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="auth-login">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="login-message success"
          >
            🐾 ¡Bienvenido {nombre}!
          </motion.div>
        )}

        {showError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="login-message error"
          >
             {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="auth-login__title">Iniciar Sesión</h2>
      <form className="auth-login__form" onSubmit={handleLogin}>
        <input
          type="text"
          className="auth-login__input"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth-login__input"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit" className="auth-login__submit">
          Iniciar sesión
        </button>
      </form>
      <p className="auth-login__footer">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="auth-login__link">
          Regístrate
        </a>
      </p>
    </div>
  );
};

export default Login;