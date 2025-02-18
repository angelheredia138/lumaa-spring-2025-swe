import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

interface NavigationProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navigation">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Lumaa Logo" />{" "}
        <span className="lumaa-text">Lumaa</span>
      </Link>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/tasks">Tasks</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link">
              Login
            </Link>
            <Link to="/register" className="auth-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
