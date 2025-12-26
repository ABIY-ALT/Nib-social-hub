import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Bot } from "lucide-react";

const topics = [
  "Digital Banking Security",
  "Gen Z Investment Habits",
  "Sustainable Finance (ESG)",
  "Future of Cryptocurrency",
  "AI in Personal Finance",
];

export default function TrendingTopicsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center justify-between">
          <span>Trending Topics</span>
          <Bot className="h-5 w-5 text-accent" />
        </CardTitle>
        <CardDescription>AI-identified topics in finance right now.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {topics.map((topic, index) => (
            <li key={index} className="flex items-center justify-between text-sm">
              <span>{topic}</span>
              <Button variant="ghost" size="sm" className="h-7 gap-1">
                Explore
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
