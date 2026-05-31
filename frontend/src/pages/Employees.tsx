import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Employee } from "../types";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Employee[]>("/employees/").then(setEmployees).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Employees</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
            <th style={{ padding: "0.75rem 1rem" }}>Name</th>
            <th style={{ padding: "0.75rem 1rem" }}>Email</th>
            <th style={{ padding: "0.75rem 1rem" }}>Position</th>
            <th style={{ padding: "0.75rem 1rem" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: "0.75rem 1rem" }}>{emp.first_name} {emp.last_name}</td>
              <td style={{ padding: "0.75rem 1rem" }}>{emp.email}</td>
              <td style={{ padding: "0.75rem 1rem" }}>{emp.position}</td>
              <td style={{ padding: "0.75rem 1rem" }}>
                <StatusBadge status={emp.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "#4caf50",
    inactive: "#ff9800",
    terminated: "#f44336",
  };
  return (
    <span
      style={{
        background: colors[status] || "#999",
        color: "#fff",
        padding: "0.2rem 0.6rem",
        borderRadius: 12,
        fontSize: "0.8rem",
      }}
    >
      {status}
    </span>
  );
}
