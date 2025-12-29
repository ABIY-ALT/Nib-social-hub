import OverviewStats from '@/components/dashboard/overview-stats';
import RecentMentions from '@/components/dashboard/recent-mentions';
import SentimentChart from '@/components/dashboard/sentiment-chart';
import TrendingTopicsCard from '@/components/dashboard/trending-topics-card';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome Back, Jane!</h1>
        <p className="text-muted-foreground">Here's your social media pulse for today.</p>
      </div>

      <OverviewStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SentimentChart />
        </div>
        <div className="lg:col-span-1">
          <TrendingTopicsCard />
        </div>
      </div>
      
      <RecentMentions />

    </div>
  );
}
