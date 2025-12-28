'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "../ui/badge";

const mockTeam = [
    { id: '1', name: 'Jane Doe', role: 'Admin', avatarUrl: PlaceHolderImages.find(p => p.id === 'user1')?.imageUrl || '' },
    { id: '2', name: 'Alex Smith', role: 'Creator', avatarUrl: PlaceHolderImages.find(p => p.id === 'user2')?.imageUrl || '' },
    { id: '3', name: 'Maria Garcia', role: 'Creator', avatarUrl: PlaceHolderImages.find(p => p.id === 'user3')?.imageUrl || '' },
    { id: '4', name: 'John Carter', role: 'Compliance', avatarUrl: "https://picsum.photos/seed/user8/40/40" },
];

const roleColors: Record<string, string> = {
    Admin: 'bg-primary/20 text-primary',
    Creator: 'bg-blue-100 text-blue-800',
    Compliance: 'bg-amber-100 text-amber-800',
};

export default function TeamMembersCard() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">Team Members</CardTitle>
                    <CardDescription>Manage roles and permissions.</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite
                </Button>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {mockTeam.map(member => (
                        <li key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src={member.avatarUrl} data-ai-hint="person face" />
                                    <AvatarFallback>{member.name.slice(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Manage</Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
