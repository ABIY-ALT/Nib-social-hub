'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Facebook, Twitter, Check, X } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { SocialPlatform } from "@/lib/types";

interface PendingPost {
    id: string;
    platform: SocialPlatform;
    content: string;
    submittedBy: string;
    avatarUrl: string;
    submittedAt: string;
}

const mockPendingPosts: PendingPost[] = [
    { id: '1', platform: 'Facebook', content: 'Exciting news! We are launching a new high-yield savings account...', submittedBy: 'Alex Smith', avatarUrl: PlaceHolderImages.find(p => p.id === 'user2')?.imageUrl || '', submittedAt: '2h ago' },
    { id: '2', platform: 'X', content: 'Our Q3 earnings report is out! Read about our strong performance...', submittedBy: 'Maria Garcia', avatarUrl: PlaceHolderImages.find(p => p.id === 'user3')?.imageUrl || '', submittedAt: '5h ago' },
];

const platformIcons: Record<SocialPlatform, React.ElementType> = {
    Facebook: Facebook,
    X: Twitter,
    Instagram: Facebook, // Placeholder
    LinkedIn: Facebook, // Placeholder
    YouTube: Facebook, // Placeholder
    TikTok: Facebook, // Placeholder
};

export default function PendingApprovalsQueue() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Pending Approvals</CardTitle>
                <CardDescription>Review and approve content submitted by your team.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Content</TableHead>
                            <TableHead className="hidden md:table-cell">Submitted By</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockPendingPosts.map((post) => {
                            const Icon = platformIcons[post.platform];
                            return (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <div className="flex items-start gap-3">
                                            <Icon className="h-5 w-5 mt-1 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium max-w-md truncate">{post.content}</p>
                                                <p className="text-xs text-muted-foreground">{post.submittedAt}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8 border">
                                                <AvatarImage src={post.avatarUrl} data-ai-hint="person face" />
                                                <AvatarFallback>{post.submittedBy.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{post.submittedBy}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm">View & Comment</Button>
                                            <Button variant="outline" size="icon" className="h-9 w-9 text-red-600 hover:bg-red-50 hover:text-red-700">
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-9 w-9 text-green-600 hover:bg-green-50 hover:text-green-700">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
