import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskList from "./components/Tasks/TaskList";
import Navigation from "./components/Navigation";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/tasks" />
              )
            }
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/tasks" />}
          />
          <Route
            path="/tasks"
            element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
