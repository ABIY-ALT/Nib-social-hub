'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SocialAccount } from "@/lib/types";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, CheckCircle, XCircle } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { initializeFirebase } from '@/firebase';
import { 
  signInWithPopup, 
  FacebookAuthProvider, 
  TwitterAuthProvider,
  OAuthProvider, 
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

const { auth } = initializeFirebase();

const initialAccounts: SocialAccount[] = [
  { id: '1', platform: 'Facebook', username: 'Not Connected', avatarUrl: 'https://picsum.photos/seed/fb/40/40', isConnected: false },
  { id: '2', platform: 'X', username: 'Not Connected', avatarUrl: 'https://picsum.photos/seed/x/40/40', isConnected: false },
  { id: '3', platform: 'Instagram', username: 'Not Connected', avatarUrl: 'https://picsum.photos/seed/ig/40/40', isConnected: false },
  { id: '4', platform: 'LinkedIn', username: 'Not Connected', avatarUrl: 'https://picsum.photos/seed/li/40/40', isConnected: false },
  { id: '5', platform: 'YouTube', username: 'Not Connected', avatarUrl: 'https://picsum.photos/seed/yt/40/40', isConnected: false },
];

const platformIcons = {
  Facebook: Facebook,
  X: Twitter,
  Instagram: Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

const platformProviders = {
    Facebook: new FacebookAuthProvider(),
    X: new TwitterAuthProvider(),
    LinkedIn: new OAuthProvider('linkedin.com'),
    // Instagram and YouTube would be handled differently, often via their parent company APIs (Facebook/Google)
    Instagram: null,
    YouTube: null,
};

export default function AccountConnections() {
    const [accounts, setAccounts] = useState(initialAccounts);
    const [user, setUser] = useState<User | null>(null);
    const { toast } = useToast();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Update account states based on provider data
                setAccounts(prevAccounts => prevAccounts.map(acc => {
                    const providerData = currentUser.providerData.find(pd => 
                        pd.providerId.includes(acc.platform.toLowerCase())
                    );
                    if (providerData) {
                        return {
                            ...acc,
                            isConnected: true,
                            username: providerData.displayName || acc.username,
                            avatarUrl: providerData.photoURL || acc.avatarUrl
                        };
                    }
                    return acc;
                }));
            } else {
                // Reset all to not connected
                setAccounts(initialAccounts);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleConnect = async (platform: SocialPlatform) => {
        const provider = platformProviders[platform];
        if (!provider || !auth) {
            toast({ title: "Connection not available", description: `We do not support connecting with ${platform} at this time.`, variant: "destructive" });
            return;
        }

        try {
            const result = await signInWithPopup(auth, provider);
            const credential = OAuthProvider.credentialFromResult(result);
            // You can now access the OAuth token if needed
            // const token = credential?.accessToken;
            toast({ title: "Success!", description: `Connected to ${platform}.` });
        } catch (error: any) {
            console.error(error);
            toast({ title: "Connection Failed", description: error.message, variant: "destructive" });
        }
    };

    const handleDisconnect = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
            toast({ title: "Disconnected", description: "You have been disconnected from all accounts." });
        } catch (error: any) {
            console.error(error);
            toast({ title: "Error", description: "Could not disconnect.", variant: "destructive" });
        }
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
            const isSupported = !!platformProviders[account.platform];

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
                        {account.isConnected ? (
                             <Button 
                                variant='destructive'
                                onClick={handleDisconnect}
                            >
                                Disconnect
                            </Button>
                        ) : (
                            <Button 
                                onClick={() => handleConnect(account.platform)}
                                disabled={!isSupported}
                            >
                                Connect
                            </Button>
                        )}
                    </div>
                </div>
            )
        })}
      </CardContent>
    </Card>
  );
}
