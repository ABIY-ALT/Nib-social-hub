import RiskChecker from "../../../components/ai-risk-check/risk-checker";

export default function AiRiskCheckPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Content Risk Check</h1>
        <p className="text-muted-foreground">
          Automatically review content for brand guidelines, regulatory compliance, and sensitive words before publishing.
        </p>
      </div>

      <RiskChecker />
    </div>
  );
}
