import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const linkStyle = {
  display: "block",
  padding: "0.75rem 1.5rem",
  color: "#ccc",
  textDecoration: "none",
  fontSize: "0.95rem",
};

const activeStyle = {
  ...linkStyle,
  color: "#fff",
  background: "rgba(255,255,255,0.1)",
  borderLeft: "3px solid #4fc3f7",
};

export default function Sidebar() {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav
      style={{
        width: 240,
        background: "#1e1e2f",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1.5rem",
          fontSize: "1.25rem",
          fontWeight: 700,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        NomandTax
      </div>

      <NavLink
        to="/"
        end
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/employees"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Employees
      </NavLink>
      <NavLink
        to="/departments"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Departments
      </NavLink>
      <NavLink
        to="/leaves"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Leave Management
      </NavLink>

      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.8rem",
            color: "#888",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {email}
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: "block",
            width: "100%",
            padding: "0.6rem 1.5rem",
            background: "none",
            border: "none",
            color: "#ccc",
            fontSize: "0.9rem",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
