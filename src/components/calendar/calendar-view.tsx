'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import type { ScheduledPost, SocialPlatform } from '@/lib/types';
import { Facebook, Instagram, Linkedin, Twitter, MoreHorizontal, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const mockPosts: ScheduledPost[] = [
  { id: '1', platform: 'LinkedIn', content: "Webinar on ESG investments...", scheduledAt: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'approved' },
  { id: '2', platform: 'X', content: "Quick poll on mobile banking features...", scheduledAt: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'scheduled' },
  { id: '3', platform: 'Facebook', content: "New blog post about saving for retirement...", scheduledAt: new Date(new Date().setDate(new Date().getDate() + 5)), status: 'pending' },
  { id: '4', platform: 'Instagram', content: "Behind the scenes at our new branch...", scheduledAt: new Date(new Date().setDate(new Date().getDate() - 3)), status: 'published' },
  { id: '5', platform: 'X', content: "Teaser for the upcoming quarterly report...", scheduledAt: new Date(), status: 'draft' },
  { id: '6', platform: 'Facebook', content: "Customer story feature...", scheduledAt: new Date(), status: 'approved' },
  { id: '7', platform: 'LinkedIn', content: "Article about fintech trends...", scheduledAt: new Date(new Date().setDate(new Date().getDate() + 5)), status: 'scheduled' },
];

const platformInfo: Record<Exclude<SocialPlatform, 'YouTube' | 'TikTok'>, { icon: React.ElementType, color: string }> = {
  Facebook: { icon: Facebook, color: 'text-blue-600' },
  X: { icon: Twitter, color: 'text-foreground' },
  Instagram: { icon: Instagram, color: 'text-pink-500' },
  LinkedIn: { icon: Linkedin, color: 'text-sky-700' },
};

const statusInfo = {
  draft: { label: 'Draft', color: 'bg-gray-200 text-gray-700' },
  pending: { label: 'Pending', color: 'bg-amber-200 text-amber-800' },
  scheduled: { label: 'Scheduled', color: 'bg-blue-200 text-blue-800' },
  approved: { label: 'Approved', color: 'bg-indigo-200 text-indigo-800' },
  published: { label: 'Published', color: 'bg-green-200 text-green-800' },
};

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const postsForSelectedDay = date
    ? mockPosts.filter(p => p.scheduledAt.toDateString() === date.toDateString())
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2">
        <CardContent className="p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0 [&_td]:w-full"
            classNames={{
              months: "w-full",
              month: "w-full",
              table: "w-full border-collapse",
              head_row: "w-full flex",
              row: "w-full flex mt-2",
              day: "h-28 w-full relative p-1.5 align-top",
              day_selected: "bg-primary/10 text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
            }}
            components={{
              DayContent: ({ date }) => {
                const dailyPosts = mockPosts.filter(
                  (post) => post.scheduledAt.toDateString() === date.toDateString()
                );
                return (
                  <>
                    <span className="absolute top-1.5 left-2">{date.getDate()}</span>
                    {dailyPosts.length > 0 && (
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-1">
                        {dailyPosts.slice(0, 3).map(post => {
                           if (post.platform === 'YouTube' || post.platform === 'TikTok') return null;
                           const pInfo = platformInfo[post.platform];
                           return <div key={post.id} className={cn("h-1.5 w-1.5 rounded-full", pInfo.color.replace('text-', 'bg-'))}></div>
                        })}
                        {dailyPosts.length > 3 && <span className='text-xs text-muted-foreground'>+</span>}
                      </div>
                    )}
                  </>
                );
              },
            }}
          />
        </CardContent>
      </Card>
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardContent className='p-4'>
            <h2 className="font-headline text-lg font-semibold mb-4">
              {date ? `Schedule for ${date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : 'Select a day'}
            </h2>
            {postsForSelectedDay.length > 0 ? (
              <ul className='space-y-3'>
                {postsForSelectedDay.map(post => {
                  if (post.platform === 'YouTube' || post.platform === 'TikTok') return null;
                  const pInfo = platformInfo[post.platform];
                  const sInfo = statusInfo[post.status];
                  return (
                    <li key={post.id} className="group flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <GripVertical className="h-5 w-5 mt-1 text-muted-foreground/50 cursor-grab" />
                      <div className='flex-grow'>
                        <div className="flex items-center mb-1">
                          <pInfo.icon className={`h-4 w-4 mr-2 ${pInfo.color}`} />
                          <span className='font-semibold text-sm'>{post.platform}</span>
                          <span className='ml-auto text-xs font-mono'>{post.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className='text-sm text-muted-foreground mb-2'>{post.content}</p>
                        <div className="flex items-center justify-between">
                            <Badge className={cn("text-xs", sInfo.color)}>{sInfo.label}</Badge>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className='flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg'>
                <p className="font-medium">No posts scheduled</p>
                <p className="text-sm">Select a day to view its schedule or click below to create a new post.</p>
                <Button variant="outline" className="mt-4">Create Post</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
