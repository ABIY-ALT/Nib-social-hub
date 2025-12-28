'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  CornerDownRight,
  Filter,
  UserPlus,
  ThumbsUp,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Conversation, SocialPlatform } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    platform: 'Facebook',
    type: 'comment',
    author: 'Mark Johnson',
    authorHandle: 'markj',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'user4')?.imageUrl || '',
    timestamp: '2m ago',
    content: "Just opened a checking account with you. The mobile app is fantastic! So easy to use.",
    isRead: false,
    sentiment: "positive",
    replies: [],
  },
  {
    id: 'conv2',
    platform: 'X',
    type: 'message',
    author: 'Emily White',
    authorHandle: '@emwhite',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'user5')?.imageUrl || '',
    timestamp: '15m ago',
    content: "I'm having trouble with a wire transfer. Can someone please help me?",
    isRead: false,
    sentiment: "negative",
    replies: [],
  },
  {
    id: 'conv3',
    platform: 'Instagram',
    type: 'comment',
    author: 'Digital Nomad',
    authorHandle: '@digitalnomadlife',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'user6')?.imageUrl || '',
    timestamp: '1h ago',
    content: "What are your international transfer fees like? Planning a big trip!",
    isRead: true,
    sentiment: "neutral",
    replies: [
        { author: 'Jane Doe', avatarUrl: PlaceHolderImages.find(p => p.id === 'user1')?.imageUrl || '', content: 'Hi there! Our international transfer fees are very competitive. You can find all the details on our website under the "Fees" section. Safe travels!', timestamp: '45m ago' }
    ],
  },
    {
    id: 'conv4',
    platform: 'LinkedIn',
    type: 'message',
    author: 'Michael Chen',
    authorHandle: 'michael-chen-cpa',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'user7')?.imageUrl || '',
    timestamp: '3h ago',
    content: "I'm interested in your business banking services. Could you connect me with a representative?",
    isRead: true,
    sentiment: "neutral",
    replies: [],
    },
];

const platformInfo: Record<SocialPlatform, { icon: React.ElementType, color: string }> = {
  Facebook: { icon: Facebook, color: 'text-blue-600' },
  X: { icon: Twitter, color: 'text-foreground' },
  Instagram: { icon: Instagram, color: 'text-pink-500' },
  LinkedIn: { icon: Linkedin, color: 'text-sky-700' },
  YouTube: { icon: Youtube, color: 'text-red-600' },
  TikTok: { icon: () => <div></div>, color: '' }, // Placeholder
};

const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    negative: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    neutral: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
  };

export default function InboxLayout() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0]);
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user1');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
      <Card className="md:col-span-1 lg:col-span-1 flex flex-col">
        <CardHeader className="border-b p-4">
            <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-lg">Conversations</CardTitle>
                <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
        </CardHeader>
        <ScrollArea className="flex-grow">
          <CardContent className="p-0">
            {mockConversations.map((conv) => {
              const pInfo = platformInfo[conv.platform];
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={cn(
                    "flex items-start gap-4 p-4 w-full text-left border-b hover:bg-muted/50 transition-colors",
                    selectedConversation.id === conv.id && "bg-muted"
                  )}
                >
                    {!conv.isRead && <div className="h-2.5 w-2.5 rounded-full bg-primary mt-2"></div>}
                    <Avatar className={cn("h-10 w-10 border", conv.isRead && "ml-[14px]")}>
                        <AvatarImage src={conv.avatarUrl} data-ai-hint="person face"/>
                        <AvatarFallback>{conv.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  <div className="flex-grow truncate">
                    <div className="flex items-center gap-2 text-sm">
                      <pInfo.icon className={cn("h-4 w-4", pInfo.color)} />
                      <span className="font-semibold">{conv.author}</span>
                      <span className="text-muted-foreground truncate">· {conv.authorHandle}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">{conv.content}</p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </ScrollArea>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3 flex flex-col">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b p-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={selectedConversation.avatarUrl} data-ai-hint="person face" />
                        <AvatarFallback>{selectedConversation.author.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='font-semibold'>{selectedConversation.author}</p>
                        <p className='text-sm text-muted-foreground'>
                            {selectedConversation.type === 'comment' ? 'Commented on' : 'Messaged on'} {selectedConversation.platform}
                        </p>
                    </div>
                    <div className='ml-auto flex items-center gap-2'>
                        <Badge className={cn(sentimentColors[selectedConversation.sentiment])}>{selectedConversation.sentiment}</Badge>
                        <Button variant="outline" size="sm"><UserPlus className='mr-2 h-4 w-4'/>Assign</Button>
                    </div>
                </div>
            </CardHeader>
            <ScrollArea className="flex-grow">
              <CardContent className="p-6 space-y-6">
                <div className="flex gap-4">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={selectedConversation.avatarUrl} data-ai-hint="person face" />
                        <AvatarFallback>{selectedConversation.author.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className='rounded-lg bg-muted p-4 flex-grow'>
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{selectedConversation.author}</span>
                            <span className="text-xs text-muted-foreground">{selectedConversation.timestamp}</span>
                        </div>
                        <p className='text-sm'>{selectedConversation.content}</p>
                    </div>
                </div>

                {selectedConversation.replies.map((reply, index) => (
                    <div key={index} className="flex gap-4">
                        <Avatar className="h-10 w-10 border">
                            <AvatarImage src={reply.avatarUrl} data-ai-hint="person face" />
                            <AvatarFallback>{reply.author.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className='rounded-lg bg-primary/10 p-4 flex-grow'>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{reply.author}</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <p className='text-sm'>{reply.content}</p>
                        </div>
                    </div>
                ))}

              </CardContent>
            </ScrollArea>
            <CardFooter className="p-4 border-t">
                <div className="relative w-full">
                    <Textarea placeholder="Type your reply..." className="pr-24"/>
                    <div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2'>
                        <Button variant="ghost" size="icon"><ThumbsUp/></Button>
                        <Button><CornerDownRight className='mr-2'/>Reply</Button>
                    </div>
                </div>
            </CardFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Mail className="h-12 w-12 mb-4" />
            <p className="font-medium text-lg">Select a conversation</p>
            <p>Choose a conversation from the left to see details.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
