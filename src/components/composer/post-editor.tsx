'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { SocialPlatform } from "@/lib/types";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Image as ImageIcon, CalendarClock, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

const platformIcons = {
  Facebook: Facebook,
  X: Twitter,
  Instagram: Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

const platforms: SocialPlatform[] = ["Facebook", "X", "Instagram", "LinkedIn"];

export default function PostEditor() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user1');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-4 flex gap-4">
            <Avatar className="h-10 w-10 border">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User" data-ai-hint={userAvatar.imageHint} />}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Textarea 
                placeholder="What's on your mind? Start typing your post here..."
                className="min-h-40 text-lg border-0 focus-visible:ring-0 px-0 shadow-none"
              />
              <div className="w-full h-48 mt-4 rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground bg-muted/50">
                <ImageIcon className="mr-2 h-6 w-6"/>
                <span>Drag & drop media or click to upload</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">Publish to</p>
            <div className="flex items-center space-x-2">
              {platforms.map((platform) => {
                const Icon = platformIcons[platform];
                const isSelected = selectedPlatforms.includes(platform);
                return (
                  <Button
                    key={platform}
                    variant={isSelected ? "default" : "outline"}
                    size="icon"
                    onClick={() => togglePlatform(platform)}
                    className={cn("rounded-full", isSelected && "bg-primary text-primary-foreground")}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">Schedule</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
          </CardContent>
        </Card>
        <div className="flex flex-col space-y-2">
            <Button size="lg" className="w-full gap-2 font-bold">
                <Send className="h-4 w-4"/>
                Publish Now
            </Button>
            <Button size="lg" variant="secondary" className="w-full gap-2 font-bold">
                <CalendarClock className="h-4 w-4"/>
                Schedule Post
            </Button>
        </div>
      </div>
    </div>
  );
}
