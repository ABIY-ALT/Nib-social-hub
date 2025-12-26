'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
  { month: 'January', positive: 186, negative: 80, neutral: 120 },
  { month: 'February', positive: 305, negative: 200, neutral: 150 },
  { month: 'March', positive: 237, negative: 120, neutral: 180 },
  { month: 'April', positive: 73, negative: 190, neutral: 90 },
  { month: 'May', positive: 209, negative: 130, neutral: 160 },
  { month: 'June', positive: 214, negative: 140, neutral: 190 },
];

const chartConfig = {
  positive: {
    label: 'Positive',
    color: 'hsl(var(--chart-4))',
  },
  negative: {
    label: 'Negative',
    color: 'hsl(var(--destructive))',
  },
  neutral: {
    label: 'Neutral',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export default function SentimentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Sentiment Analysis</CardTitle>
        <CardDescription>Positive vs. Negative vs. Neutral Mentions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="positive" fill="var(--color-positive)" radius={4} />
            <Bar dataKey="negative" fill="var(--color-negative)" radius={4} />
            <Bar dataKey="neutral" fill="var(--color-neutral)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
