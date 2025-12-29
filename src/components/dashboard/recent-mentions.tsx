import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Mention, SocialPlatform } from "@/lib/types";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const mentions: Mention[] = [
  {
    id: '1',
    platform: 'X',
    author: 'CryptoKing',
    authorHandle: '@cryptoking88',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'user2')?.imageUrl || '',
    content: "Just tried the new investment feature on @BankSocialAI's app. Super smooth experience! #fintech",
    timestamp: "2h ago",
    sentiment: "positive",
  },
  {
    id: '2',
    platform: 'Facebook',
    author: 'Sarah Miller',
    authorHandle: 'sarahmiller',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'user3')?.imageUrl || '',
    content: "Why is the online banking portal so slow today? @BankSocialAI please fix it.",
    timestamp: "5h ago",
    sentiment: "negative",
  },
  {
    id: '3',
    platform: 'LinkedIn',
    author: 'John Carter',
    authorHandle: 'johncarter-cfo',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'user1')?.imageUrl || '',
    content: "Attended a great webinar by BankSocialAI on the future of ESG investments. Very insightful.",
    timestamp: "1d ago",
    sentiment: "positive",
  },
    {
    id: '4',
    platform: 'Instagram',
    author: 'TravelGram',
    authorHandle: '@travelgram',
    avatarUrl: 'https://picsum.photos/seed/user4/40/40',
    content: "My @BankSocialAI credit card has the best travel rewards! No foreign transaction fees is a lifesaver.",
    timestamp: "2d ago",
    sentiment: "positive",
  },
  {
    id: '5',
    platform: 'YouTube',
    author: 'FinanceExplained',
    authorHandle: 'FinanceExplained',
    avatarUrl: 'https://picsum.photos/seed/user5/40/40',
    content: "Just a heads up, the information about mortgage rates in your latest video seems outdated.",
    timestamp: "3d ago",
    sentiment: "neutral",
  },
];

const platformIcons: Record<SocialPlatform, React.ReactElement> = {
  Facebook: <Facebook className="h-4 w-4 text-blue-600" />,
  X: <Twitter className="h-4 w-4" />,
  Instagram: <Instagram className="h-4 w-4 text-pink-500" />,
  LinkedIn: <Linkedin className="h-4 w-4 text-sky-700" />,
  YouTube: <Youtube className="h-4 w-4 text-red-600" />,
  TikTok: <></>,
};

const sentimentColors = {
  positive: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  negative: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  neutral: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
};

export default function RecentMentions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Mentions</CardTitle>
        <CardDescription>Live mentions from across your connected platforms.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead className="hidden md:table-cell">Mention</TableHead>
              <TableHead className="text-center">Platform</TableHead>
              <TableHead className="text-right">Sentiment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mentions.map((mention) => (
              <TableRow key={mention.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mention.avatarUrl} alt={mention.author} data-ai-hint="person face" />
                      <AvatarFallback>{mention.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                      {mention.author}
                      <div className="text-sm text-muted-foreground">{mention.authorHandle}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-sm truncate">
                  <span className="text-muted-foreground">{mention.content}</span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    {platformIcons[mention.platform]}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={`${sentimentColors[mention.sentiment]}`}>
                    {mention.sentiment}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
