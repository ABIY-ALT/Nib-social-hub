'use client';

import { Pie, PieChart } from 'recharts';
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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { platform: 'Facebook', engagement: 275, fill: 'var(--color-facebook)' },
  { platform: 'X', engagement: 200, fill: 'var(--color-x)' },
  { platform: 'Instagram', engagement: 350, fill: 'var(--color-instagram)' },
  { platform: 'LinkedIn', engagement: 150, fill: 'var(--color-linkedin)' },
];

const chartConfig = {
  engagement: {
    label: 'Engagement',
  },
  facebook: {
    label: 'Facebook',
    color: 'hsl(var(--chart-1))',
  },
  x: {
    label: 'X',
    color: 'hsl(var(--chart-2))',
  },
  instagram: {
    label: 'Instagram',
    color: 'hsl(var(--chart-3))',
  },
  linkedin: {
    label: 'LinkedIn',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export default function PerformanceByPlatform() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Performance by Platform</CardTitle>
        <CardDescription>Total engagement distribution.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={chartConfig} className="h-[250px] w-full max-w-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="engagement" hideLabel />} />
            <Pie data={chartData} dataKey="engagement" nameKey="platform" innerRadius={60} strokeWidth={5} />
            <ChartLegend
              content={<ChartLegendContent nameKey="platform" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
