import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Mentions",
    value: "12,408",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "text-blue-500",
  },
  {
    title: "Engagement Rate",
    value: "4.87%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: ThumbsUp,
    iconColor: "text-green-500",
  },
  {
    title: "Positive Sentiment",
    value: "78%",
    change: "-1.2%",
    changeType: "negative" as const,
    icon: MessageSquare,
    iconColor: "text-purple-500",
  },
  {
    title: "Trending Topics",
    value: "5",
    change: "+2",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconColor: "text-amber-500",
  },
];

export default function OverviewStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{stat.value}</div>
            <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
