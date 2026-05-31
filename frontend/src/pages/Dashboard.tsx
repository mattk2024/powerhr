export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to NomandTax. Use the sidebar to navigate.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
        <StatCard label="Total Employees" value="--" />
        <StatCard label="Departments" value="--" />
        <StatCard label="Pending Leave Requests" value="--" />
        <StatCard label="Today's Attendance" value="--" />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <div style={{ fontSize: "0.85rem", color: "#888", marginBottom: "0.5rem" }}>{label}</div>
      <div style={{ fontSize: "1.75rem", fontWeight: 700 }}>{value}</div>
    </div>
  );
}
