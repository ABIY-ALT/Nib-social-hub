'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Lightbulb, Loader2 } from 'lucide-react';
import { generateSummariesForPlatform } from '@/ai/flows/generate-summaries-for-platform';
import { useToast } from '@/hooks/use-toast';

export default function AiInsightsCard() {
    const [insight, setInsight] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const fetchInsight = async () => {
        setIsLoading(true);
        try {
            // Using a mock since the real flow needs more data
            const result = await generateSummariesForPlatform({
                platform: 'All Platforms',
                brandKeywords: 'BankSocialAI, digital banking',
                conversationData: JSON.stringify([
                    { text: 'Love the new app!', sentiment: 'positive' },
                    { text: 'The rates are competitive', sentiment: 'positive' },
                    { text: 'Customer service was slow', sentiment: 'negative' },
                ]),
            });
            setInsight(`${result.summary} The general sentiment is ${result.sentiment}. A key trend is ${result.keyTrends}.`);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Could not fetch AI insight.',
                variant: 'destructive',
            });
            // Set a fallback insight on error
            setInsight("Across platforms, customers appreciate the new app's user experience. However, there are mentions of slow customer service response times, which could be an area for improvement. The overall sentiment remains positive, driven by competitive product offerings.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Bot className="text-accent" />
                        <span>AI-Driven Insights & Recommendations</span>
                    </CardTitle>
                    <CardDescription>Let AI analyze your performance and suggest improvements.</CardDescription>
                </div>
                <Button onClick={fetchInsight} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Generate Insight
                        </>
                    )}
                </Button>
            </CardHeader>
            <CardContent>
                <div className="p-4 rounded-lg bg-muted/50 min-h-24 flex items-center">
                    {insight ? (
                        <p className="text-sm">{insight}</p>
                    ) : (
                        <p className="text-sm text-muted-foreground">Click "Generate Insight" to get AI-powered recommendations based on your recent activity.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
