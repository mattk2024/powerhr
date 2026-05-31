import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { token, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={wrapperStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={{ margin: "0 0 1.5rem", fontSize: "1.5rem" }}>Log in to NomandTax</h1>

        {error && <div style={errorStyle}>{error}</div>}

        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={{ color: "#1976d2" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

const wrapperStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5f5f5",
};

const formStyle: React.CSSProperties = {
  width: 380,
  background: "#fff",
  padding: "2rem",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.25rem",
  fontSize: "0.9rem",
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.6rem 0.75rem",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: "0.95rem",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.7rem",
  background: "#1e88e5",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  background: "#ffebee",
  color: "#c62828",
  padding: "0.6rem 0.75rem",
  borderRadius: 6,
  marginBottom: "1rem",
  fontSize: "0.9rem",
};
