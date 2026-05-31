import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { LeaveRequest } from "../types";

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<LeaveRequest[]>("/leaves/").then(setLeaves).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Leave Management</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
            <th style={{ padding: "0.75rem 1rem" }}>Type</th>
            <th style={{ padding: "0.75rem 1rem" }}>Start</th>
            <th style={{ padding: "0.75rem 1rem" }}>End</th>
            <th style={{ padding: "0.75rem 1rem" }}>Status</th>
            <th style={{ padding: "0.75rem 1rem" }}>Reason</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: "0.75rem 1rem" }}>{leave.leave_type}</td>
              <td style={{ padding: "0.75rem 1rem" }}>{leave.start_date}</td>
              <td style={{ padding: "0.75rem 1rem" }}>{leave.end_date}</td>
              <td style={{ padding: "0.75rem 1rem" }}>
                <StatusBadge status={leave.status} />
              </td>
              <td style={{ padding: "0.75rem 1rem" }}>{leave.reason || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "#ff9800",
    approved: "#4caf50",
    rejected: "#f44336",
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
