export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">Scheduled Posts</div>
        <div className="card">Engagement</div>
        <div className="card">AI Risk Alerts</div>
      </div>
    </div>
  );
}