'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Campaign } from "@/lib/types";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const mockCampaigns: Campaign[] = [
    { id: '1', name: 'Q2 Student Savings Drive', status: 'active', startDate: new Date('2024-04-01'), endDate: new Date('2024-06-30'), engagement: 12500, reach: 350000 },
    { id: '2', name: 'Summer Mortgage Rates', status: 'active', startDate: new Date('2024-06-01'), endDate: new Date('2024-08-31'), engagement: 4200, reach: 120000 },
    { id: '3', name: 'New Mobile App Launch', status: 'completed', startDate: new Date('2024-03-15'), endDate: new Date('2024-04-15'), engagement: 25000, reach: 800000 },
    { id: '4', name: 'End-of-Year Financial Planning', status: 'planned', startDate: new Date('2024-11-01'), endDate: new Date('2024-12-31'), engagement: 0, reach: 0 },
    { id: '5', 'name': 'Small Business Loans Event', status: 'paused', startDate: new Date('2024-05-01'), endDate: new Date('2024-05-31'), engagement: 1500, reach: 50000 },
];

const statusColors: Record<Campaign['status'], string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    planned: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    paused: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
};

const formatDate = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export default function CampaignsList() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">All Campaigns</CardTitle>
                    <CardDescription>An overview of all your marketing initiatives.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Campaign
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Duration</TableHead>
                            <TableHead className="hidden lg:table-cell text-right">Engagement</TableHead>
                            <TableHead className="hidden lg:table-cell text-right">Reach</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockCampaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                                <TableCell>
                                    <div className="font-medium">{campaign.name}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={cn("capitalize", statusColors[campaign.status])}>{campaign.status}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                                </TableCell>
                                <TableCell className="hidden lg:table-cell text-right">{campaign.engagement.toLocaleString()}</TableCell>
                                <TableCell className="hidden lg:table-cell text-right">{campaign.reach.toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
