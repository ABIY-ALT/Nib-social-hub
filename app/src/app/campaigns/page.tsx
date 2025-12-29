import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, PlusCircle } from "lucide-react";
import type { Campaign, CampaignStatus } from "@/lib/types";

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Spring Savings Account Push', status: 'active', startDate: new Date('2024-05-01'), endDate: new Date('2024-06-30'), engagement: 12500, reach: 540000 },
  { id: '2', name: 'Q2 Mortgage Rate Promotion', status: 'completed', startDate: new Date('2024-04-01'), endDate: new Date('2024-04-30'), engagement: 8800, reach: 320000 },
  { id: '3', name: 'Summer Travel Rewards Card', status: 'planned', startDate: new Date('2024-07-01'), endDate: new Date('2024-08-31'), engagement: 0, reach: 0 },
  { id: '4', name: 'Small Business Loan Initiative', status: 'paused', startDate: new Date('2024-05-15'), endDate: new Date('2024-06-15'), engagement: 3400, reach: 150000 },
  { id: '5', name: 'Financial Literacy Webinar Series', status: 'active', startDate: new Date('2024-06-01'), endDate: new Date('2024-06-28'), engagement: 5600, reach: 210000 },
];

const statusStyles: Record<CampaignStatus, string> = {
  active: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  planned: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  completed: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
  paused: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700',
};

export default function CampaignsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Campaigns</h1>
            <p className="text-muted-foreground">
                Manage, track, and analyze your marketing campaigns.
            </p>
        </div>
        <Button size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Campaign
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>An overview of all your current and past campaigns.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead className="text-right">Engagement</TableHead>
                    <TableHead className="text-right">Reach</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className={cn("capitalize", statusStyles[campaign.status])}>
                                {campaign.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex items-center justify-end gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" /> 
                            {campaign.engagement.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">{campaign.reach.toLocaleString()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
