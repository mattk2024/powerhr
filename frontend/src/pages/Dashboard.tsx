import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../contexts/AuthContext";

interface Stats {
  total_employees: number;
  total_departments: number;
  pending_leaves: number;
  today_attendance: number;
}

export default function Dashboard() {
  const { email } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get<Stats>("/stats/").then(setStats);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {email}.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
        <StatCard label="Total Employees" value={stats?.total_employees} />
        <StatCard label="Departments" value={stats?.total_departments} />
        <StatCard label="Pending Leave Requests" value={stats?.pending_leaves} />
        <StatCard label="Today's Attendance" value={stats?.today_attendance} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <div style={{ fontSize: "0.85rem", color: "#888", marginBottom: "0.5rem" }}>{label}</div>
      <div style={{ fontSize: "1.75rem", fontWeight: 700 }}>{value ?? "--"}</div>
    </div>
  );
}
