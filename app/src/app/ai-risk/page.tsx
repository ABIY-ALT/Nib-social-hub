export default function AIRiskCheck() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        AI Content Risk Check
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <p>Risk Level: 🔴 High</p>
        <p>Issue: Compliance & reputation risk detected</p>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
          View Recommendation
        </button>
      </div>
    </div>
  );
}