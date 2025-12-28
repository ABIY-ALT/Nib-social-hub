'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Edit, Copy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateInitialPostIdeas } from '@/ai/flows/generate-initial-post-ideas';

export default function AiCreatorForm() {
  const [prompt, setPrompt] = useState('');
  const [goal, setGoal] = useState('Awareness');
  const [tone, setTone] = useState('Professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Prompt is empty',
        description: 'Please enter a topic or idea to generate content.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedContent('');
    try {
      // We can create a more specific flow later. For now, we'll adapt the post ideas flow.
      const result = await generateInitialPostIdeas({
        productOrServiceDescription: `Generate a social media post with the goal of ${goal} and a ${tone} tone about the following topic: ${prompt}`,
      });
      // Pick the first idea and refine it for demo purposes.
      const post = result.postIdeas[0] || "No content generated. Please try a different prompt.";
      setGeneratedContent(post);
    } catch (error) {
      console.error("AI content generation failed:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI content. Please try again.",
        variant: "destructive",
      });
      setGeneratedContent("There was an error generating content. Our AI might be taking a coffee break.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Copied!',
      description: 'AI content copied to clipboard.',
    });
  };


  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-lg font-semibold font-headline">Your Topic or Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., The benefits of our new mobile banking app for students."
                className="min-h-48 text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Content Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Awareness">Awareness</SelectItem>
                    <SelectItem value="Promotion">Promotion</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Engagement">Engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Brand Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Witty">Witty</SelectItem>
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="Inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button size="lg" onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Bot className="mr-2 h-5 w-5" />
                        Generate Content
                    </>
                )}
            </Button>
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col">
            <Label className="text-lg font-semibold font-headline mb-2">Generated Content</Label>
            <Card className="flex-grow bg-muted/50">
              <div className="relative h-full min-h-64">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                        <Sparkles className="h-10 w-10 mb-4 animate-pulse text-primary" />
                        <p className="font-medium">AI is crafting your post...</p>
                        <p className="text-sm">This can take a few moments.</p>
                    </div>
                )}

                {!isLoading && !generatedContent && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                        <Bot className="h-10 w-10 mb-4" />
                        <p className="font-medium">Your AI-generated content will appear here.</p>
                        <p className="text-sm">Fill out the details on the left and click "Generate Content" to start.</p>
                    </div>
                )}
                
                {generatedContent && !isLoading && (
                  <>
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className="w-full h-full min-h-64 p-4 text-base border-0 bg-transparent focus-visible:ring-0"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <Button variant="ghost" size="icon" title="Copy to Clipboard" onClick={copyToClipboard}>
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" onClick={handleGenerate} title="Regenerate">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Regenerate
                        </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
