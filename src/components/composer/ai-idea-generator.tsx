'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { generateInitialPostIdeas } from "@/ai/flows/generate-initial-post-ideas";
import { Bot, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AiIdeaGenerator() {
  const [prompt, setPrompt] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setIdeas([]);
    try {
      const result = await generateInitialPostIdeas({ productOrServiceDescription: prompt });
      setIdeas(result.postIdeas);
    } catch (error) {
      console.error("AI idea generation failed:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Post idea copied to clipboard.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold font-headline mb-2">Brainstorm with AI</h2>
        <p className="text-muted-foreground mb-4">Describe a product, service, or event, and let our AI generate engaging post ideas for you.</p>
        <Textarea
          placeholder="e.g., 'A new high-yield savings account for young professionals with a mobile-first approach and automated saving goals.'"
          className="min-h-48 mb-4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <Button onClick={handleGenerate} disabled={isLoading || !prompt.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              Generate Ideas
            </>
          )}
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold font-headline mb-2">Generated Ideas</h2>
        <p className="text-muted-foreground mb-4">Here are some creative starting points. Click to copy an idea.</p>
        <Card className="h-[290px]">
          <ScrollArea className="h-full">
            <CardContent className="p-4">
              {isLoading && (
                 <div className="flex items-center justify-center h-48 text-muted-foreground">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    <span>AI is thinking...</span>
                </div>
              )}
              {!isLoading && ideas.length === 0 && (
                <div className="flex items-center justify-center h-48 text-muted-foreground">
                  <p>Your AI-generated ideas will appear here.</p>
                </div>
              )}
              <ul className="space-y-3">
                {ideas.map((idea, index) => (
                  <li
                    key={index}
                    className="group flex justify-between items-start p-3 rounded-lg bg-muted/50 transition-colors"
                  >
                    <p className="text-sm pr-4">{idea}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(idea)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
