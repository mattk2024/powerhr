import { NavLink } from "react-router-dom";

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
    </nav>
  );
}
