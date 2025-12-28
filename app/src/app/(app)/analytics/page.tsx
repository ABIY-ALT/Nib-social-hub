import AiInsightsCard from "@/components/analytics/ai-insights-card";
import EngagementChart from "@/components/analytics/engagement-chart";
import PerformanceByPlatform from "@/components/analytics/performance-by-platform";
import OverviewStats from "@/components/dashboard/overview-stats";

export default function AnalyticsPage() {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Analytics & Reporting</h1>
          <p className="text-muted-foreground">
            Track engagement, measure campaign performance, and get AI-driven insights.
          </p>
        </div>

        <OverviewStats />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <EngagementChart />
            </div>
            <div className="lg:col-span-2">
                <PerformanceByPlatform />
            </div>
        </div>

        <AiInsightsCard />
  
      </div>
    );
  }
