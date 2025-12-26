'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { date: '2024-05-01', likes: 215, comments: 45, shares: 22 },
  { date: '2024-05-02', likes: 250, comments: 50, shares: 25 },
  { date: '2024-05-03', likes: 180, comments: 30, shares: 15 },
  { date: '2024-05-04', likes: 300, comments: 60, shares: 35 },
  { date: '2024-05-05', likes: 280, comments: 55, shares: 30 },
  { date: '2024-05-06', likes: 320, comments: 65, shares: 40 },
  { date: '2024-05-07', likes: 290, comments: 58, shares: 32 },
];

const chartConfig = {
  likes: {
    label: 'Likes',
    color: 'hsl(var(--chart-1))',
  },
  comments: {
    label: 'Comments',
    color: 'hsl(var(--chart-2))',
  },
  shares: {
    label: 'Shares',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export default function EngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Engagement Over Time</CardTitle>
        <CardDescription>Likes, comments, and shares for the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="likes" type="monotone" stroke="var(--color-likes)" strokeWidth={2} dot={false} />
            <Line dataKey="comments" type="monotone" stroke="var(--color-comments)" strokeWidth={2} dot={false} />
            <Line dataKey="shares" type="monotone" stroke="var(--color-shares)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
