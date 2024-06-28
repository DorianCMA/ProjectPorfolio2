import { useEffect, useContext } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Login from "./signIn_signUp/Login";
import Register from "../components/signIn_signUp/Register";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import Dashboard from "../components/Dashboard";
import AuthContext  from '../components/AuthContext';

const Authentication = () => {
  const { isLoggedIn, login, logout } = AuthContext();
  const navigate = useNavigate();

  console.log(error, "error");
  console.log(isPasswordRecovery, "isPasswordRecovery");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      login(); // Cambiado a la función login del contexto de autenticación
      navigate("/");
    }
  }, [login, navigate]); // Agregar login como dependencia

  const handleLogin = () => {
    login(); // Cambiado a la función login del contexto de autenticación
    localStorage.setItem('token', 'token');
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout(); // Cambiado a la función logout del contexto de autenticación
    navigate("/login");
  };

  const handlePasswordRecovery = () => {
    setTimeout(() => navigate("/forgotpassword"), 1);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Dashboard onLogout={handleLogout} />
        </>
      ) : (
        <Routes>
          <>
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} onPasswordRecovery={handlePasswordRecovery} />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword />}
            />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
          </>
        </Routes>
      )}
    </div>
  );
};

export default Authentication;
