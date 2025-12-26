'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SocialAccount } from "@/lib/types";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, CheckCircle, XCircle } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';

const initialAccounts: SocialAccount[] = [
  { id: '1', platform: 'Facebook', username: 'BankSocial Page', avatarUrl: 'https://picsum.photos/seed/fb/40/40', isConnected: true },
  { id: '2', platform: 'X', username: '@BankSocialAI', avatarUrl: 'https://picsum.photos/seed/x/40/40', isConnected: true },
  { id: '3', platform: 'Instagram', username: '@banksocial.ai', avatarUrl: 'https://picsum.photos/seed/ig/40/40', isConnected: false },
  { id: '4', platform: 'LinkedIn', username: 'BankSocialAI Inc.', avatarUrl: 'https://picsum.photos/seed/li/40/40', isConnected: true },
  { id: '5', platform: 'YouTube', username: 'BankSocialAI Channel', avatarUrl: 'https://picsum.photos/seed/yt/40/40', isConnected: false },
];

const platformIcons = {
  Facebook: Facebook,
  X: Twitter,
  Instagram: Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

export default function AccountConnections() {
    const [accounts, setAccounts] = useState(initialAccounts);

    const toggleConnection = (id: string) => {
        setAccounts(accounts.map(acc => acc.id === id ? { ...acc, isConnected: !acc.isConnected } : acc));
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Account Connections</CardTitle>
        <CardDescription>Securely connect and manage your bank's social media accounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {accounts.map(account => {
            const Icon = platformIcons[account.platform];
            return (
                <div key={account.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className='flex items-center gap-4'>
                        <Icon className="h-8 w-8 text-muted-foreground" />
                        <Avatar>
                            <AvatarImage src={account.avatarUrl} data-ai-hint="logo" />
                            <AvatarFallback>{account.platform.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{account.platform}</p>
                            <p className="text-sm text-muted-foreground">{account.username}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className={cn("flex items-center gap-2 text-sm", account.isConnected ? "text-green-600" : "text-amber-500")}>
                            {account.isConnected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            <span>{account.isConnected ? "Connected" : "Not Connected"}</span>
                        </div>
                        <Button 
                            variant={account.isConnected ? 'destructive' : 'default'}
                            onClick={() => toggleConnection(account.id)}
                        >
                            {account.isConnected ? 'Disconnect' : 'Connect'}
                        </Button>
                    </div>
                </div>
            )
        })}
      </CardContent>
    </Card>
  );
}
