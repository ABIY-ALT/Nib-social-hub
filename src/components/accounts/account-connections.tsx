'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SocialAccount, SocialPlatform } from "@/lib/types";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, CheckCircle, XCircle, PlusCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

// Assume PlaceHolderImages is updated with tiktok
const mockAccounts: SocialAccount[] = [
  { id: '1', platform: 'Facebook', username: 'BankSocial Page', avatarUrl: 'https://picsum.photos/seed/fb/40/40', isConnected: true, permissions: ['Posting', 'Analytics', 'Inbox'] },
  { id: '2', platform: 'X', username: '@BankSocialAI', avatarUrl: 'https://picsum.photos/seed/x/40/40', isConnected: true, permissions: ['Posting', 'Analytics'] },
  { id: '3', platform: 'Instagram', username: '@banksocial', avatarUrl: 'https://picsum.photos/seed/ig/40/40', isConnected: true, permissions: ['Posting', 'Analytics'] },
  { id: '4', platform: 'LinkedIn', username: 'BankSocial Inc.', avatarUrl: 'https://picsum.photos/seed/li/40/40', isConnected: true, permissions: ['Posting', 'Analytics'] },
  { id: '5', platform: 'TikTok', username: 'Not Connected', avatarUrl: '', isConnected: false, permissions: [] },
  { id: '6', platform: 'YouTube', username: 'Not Connected', avatarUrl: '', isConnected: false, permissions: [] },
];

const platformInfo: Record<SocialPlatform, { icon: React.ElementType, color: string }> = {
  Facebook: { icon: Facebook, color: 'text-blue-600' },
  X: { icon: Twitter, color: 'text-foreground' },
  Instagram: { icon: Instagram, color: 'text-pink-500' },
  LinkedIn: { icon: Linkedin, color: 'text-sky-700' },
  YouTube: { icon: Youtube, color: 'text-red-600' },
  TikTok: { icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16.33 6.64a4.34 4.34 0 0 1-4.24-5.32 4.31 4.31 0 0 1 4.24 5.32zM10.15 5.7c.23.23.44.47.63.72l.2.24c.2.27.4.55.58.85a4.31 4.31 0 0 1-5.87 5.56l-.18-.18a4.34 4.34 0 0 1 4.64-6.95z"></path><path d="M12 12.28c.1.18.2.37.3.57l.15.36c.14.4.28.8.44 1.2a4.32 4.32 0 0 1-4.9 4.9l-.26-.1c-.3-.12-.6-.25-.88-.4a4.34 4.34 0 0
 1 4.15-7.53z"></path><path d="M12 12.28a4.32 4.32 0 0 0 4.9-4.9l.18.18a4.34 4.34 0 0 0-4.64 6.95z"></path></svg>, color: 'text-foreground' },
};

export default function AccountConnections() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAccounts.map(account => {
            const Info = platformInfo[account.platform];
            return (
                <Card key={account.id} className="flex flex-col">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Info.icon className={cn("h-8 w-8", Info.color)} />
                        <div>
                            <CardTitle className="font-headline text-xl">{account.platform}</CardTitle>
                            <CardDescription>
                                {account.isConnected ? "Manage connection" : "Connect new account"}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {account.isConnected ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage src={account.avatarUrl} data-ai-hint="logo" />
                                        <AvatarFallback>{account.platform.slice(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{account.username}</p>
                                        <div className="flex items-center gap-2 text-xs text-green-600">
                                            <CheckCircle className="h-3 w-3" />
                                            <span>Connected</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Permissions</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {account.permissions.map(perm => (
                                            <Badge key={perm} variant="secondary">{perm}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-6 h-full rounded-lg border-2 border-dashed">
                                <XCircle className="h-10 w-10 text-muted-foreground mb-2" />
                                <p className="font-medium">Not Connected</p>
                                <p className="text-sm text-muted-foreground">Click below to connect your account.</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {account.isConnected ? (
                            <>
                                <Button variant="outline">Manage</Button>
                                <Button variant="destructive">Disconnect</Button>
                            </>
                        ) : (
                            <Button className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Connect {account.platform}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            )
        })}
    </div>
  );
}
