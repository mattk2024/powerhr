import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Department } from "../types";

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Department[]>("/departments/").then(setDepartments).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Departments</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
            <th style={{ padding: "0.75rem 1rem" }}>Name</th>
            <th style={{ padding: "0.75rem 1rem" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: "0.75rem 1rem" }}>{dept.name}</td>
              <td style={{ padding: "0.75rem 1rem" }}>{dept.description || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
