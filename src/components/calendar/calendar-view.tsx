'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import type { ScheduledPost } from '@/lib/types';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const mockPosts: ScheduledPost[] = [
  { id: '1', platform: 'LinkedIn', content: "Webinar on ESG investments...", scheduledAt: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'scheduled' },
  { id: '2', platform: 'X', content: "Quick poll on mobile banking features...", scheduledAt: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'scheduled' },
  { id: '3', platform: 'Facebook', content: "New blog post about saving for retirement...", scheduledAt: new Date(new Date().setDate(new Date().getDate() + 5)), status: 'scheduled' },
  { id: '4', platform: 'Instagram', content: "Behind the scenes at our new branch...", scheduledAt: new Date(new Date().setDate(new Date().getDate() - 3)), status: 'published' },
];

const platformInfo = {
  Facebook: { icon: Facebook, color: 'bg-blue-600' },
  X: { icon: Twitter, color: 'bg-gray-800' },
  Instagram: { icon: Instagram, color: 'bg-pink-500' },
  LinkedIn: { icon: Linkedin, color: 'bg-sky-700' },
  YouTube: { icon: Facebook, color: 'bg-red-600' },
};

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const postsForSelectedDay = date
    ? mockPosts.filter(p => p.scheduledAt.toDateString() === date.toDateString())
    : [];

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 p-4 border-r">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0 [&_td]:w-full"
            classNames={{
                months: "w-full",
                month: "w-full",
                table: "w-full",
                head_row: "w-full",
                row: "w-full",
                day: "h-20 w-full",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary/90"
            }}
          />
        </div>
        <div className="md:col-span-1 p-4">
          <CardHeader className='p-0 mb-4'>
            <CardTitle className="font-headline text-lg">
              {date ? `Posts for ${date.toLocaleDateString()}` : 'Select a day'}
            </CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            {postsForSelectedDay.length > 0 ? (
              <ul className='space-y-4'>
                {postsForSelectedDay.map(post => {
                  const Info = platformInfo[post.platform];
                  return (
                    <li key={post.id} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center mb-2">
                        <Info.icon className={`h-4 w-4 mr-2 ${Info.color} text-white p-0.5 rounded-sm`} />
                        <span className='font-semibold text-sm'>{post.platform}</span>
                        <Badge variant="outline" className='ml-auto text-xs'>{post.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Badge>
                      </div>
                      <p className='text-sm text-muted-foreground'>{post.content}</p>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className='flex items-center justify-center h-full text-muted-foreground'>
                <p>No posts scheduled for this day.</p>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
