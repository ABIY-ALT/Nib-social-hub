'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Loader2, ShieldAlert, CheckCircle, AlertTriangle, ShieldX, Lightbulb, ClipboardCopy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type RiskLevel = 'Low' | 'Medium' | 'High' | null;

interface RiskResult {
  level: RiskLevel;
  score: number;
  explanation: string;
  recommendedRewrite: string;
  requiresApproval: boolean;
  categories: { name: 'Reputation' | 'Legal' | 'Security'; level: 'Low' | 'Medium' | 'High' }[];
  highlightedText: string;
}

const mockRiskAnalysis = (text: string): RiskResult => {
    const hasProblematicWord = /guarantee|promise|free money/.test(text.toLowerCase());
    if (hasProblematicWord) {
        return {
            level: 'High',
            score: 85,
            explanation: "The content uses the word 'guarantee', which can create legally binding expectations and is a high-risk term under financial advertising regulations (e.g., FINRA Rule 2210). This could lead to legal challenges if outcomes are not met.",
            recommendedRewrite: "Unlock potential financial growth with our new investment options. Past performance is not indicative of future results.",
            requiresApproval: true,
            categories: [
                { name: 'Legal', level: 'High' },
                { name: 'Reputation', level: 'Medium' },
                { name: 'Security', level: 'Low' },
            ],
            highlightedText: text.replace(/(guarantee|promise|free money)/gi, '<mark>$&</mark>'),
        };
    }
    return {
        level: 'Low',
        score: 12,
        explanation: 'The content meets all brand and regulatory guidelines. It is clear, concise, and uses appropriate language for the financial industry.',
        recommendedRewrite: '',
        requiresApproval: false,
        categories: [
            { name: 'Legal', level: 'Low' },
            { name: 'Reputation', level: 'Low' },
            { name: 'Security', level: 'Low' },
        ],
        highlightedText: text,
    };
};

const riskLevelInfo = {
    Low: { icon: CheckCircle, color: 'text-green-500', badge: 'bg-green-100 text-green-800' },
    Medium: { icon: AlertTriangle, color: 'text-amber-500', badge: 'bg-amber-100 text-amber-800' },
    High: { icon: ShieldX, color: 'text-red-500', badge: 'bg-red-100 text-red-800' },
};


export default function RiskChecker() {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<RiskResult | null>(null);
    const { toast } = useToast();
    
    const handleCheckRisk = () => {
        if (!content.trim()) {
            toast({ title: 'Content is empty', description: 'Please enter some text to analyze.', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            // In a real app, this would be an API call to a Genkit flow
            const analysisResult = mockRiskAnalysis(content);
            setResult(analysisResult);
            setIsLoading(false);
        }, 1500);
    };

    const copyRewrite = () => {
        if (result?.recommendedRewrite) {
            navigator.clipboard.writeText(result.recommendedRewrite);
            toast({ title: 'Copied!', description: 'Recommended rewrite copied to clipboard.' });
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Input */}
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="content-input" className="text-lg font-semibold font-headline">Content to Analyze</Label>
                            <Textarea
                                id="content-input"
                                placeholder="Paste your social media post content here..."
                                className="min-h-80 text-base"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <Button size="lg" onClick={handleCheckRisk} disabled={isLoading}>
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</>
                            ) : (
                                <><ShieldCheck className="mr-2 h-5 w-5" /> Check Content Risk</>
                            )}
                        </Button>
                    </div>

                    {/* Right Column: Results */}
                    <div className="flex flex-col">
                        <Label className="text-lg font-semibold font-headline mb-2">Risk Analysis Report</Label>
                        <Card className="flex-grow bg-muted/50 min-h-80">
                            <CardContent className="p-6 h-full">
                                {isLoading && (
                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                        <ShieldAlert className="h-10 w-10 mb-4 animate-pulse text-primary" />
                                        <p className="font-medium">AI is scanning for risks...</p>
                                        <p className="text-sm">This can take a few moments.</p>
                                    </div>
                                )}
                                {!isLoading && !result && (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                        <ShieldCheck className="h-10 w-10 mb-4" />
                                        <p className="font-medium">Your risk report will appear here.</p>
                                        <p className="text-sm">Paste content and click "Check Content Risk" to begin.</p>
                                    </div>
                                )}
                                {result && !isLoading && (
                                    <div className="space-y-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="font-headline text-xl">Overall Risk: <span className={cn('font-bold', riskLevelInfo[result.level!]?.color)}>{result.level}</span></CardTitle>
                                                <CardDescription>Based on AI analysis of compliance and brand safety.</CardDescription>
                                            </div>
                                            <Badge className={cn("text-base", riskLevelInfo[result.level!]?.badge)}>{result.score}/100</Badge>
                                        </div>
                                        
                                        <div className="p-4 rounded-lg border bg-background">
                                            <h4 className="font-semibold mb-2">Content Analysis</h4>
                                            <div
                                                className="text-sm text-muted-foreground [&_mark]:bg-amber-400/50 [&_mark]:rounded [&_mark]:px-1"
                                                dangerouslySetInnerHTML={{ __html: result.highlightedText }}
                                            />
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-semibold mb-2">Risk Categories</h4>
                                            <div className="flex gap-4">
                                                {result.categories.map(cat => (
                                                    <div key={cat.name} className="flex items-center gap-2 text-sm">
                                                        <cat.level === 'Low' ? CheckCircle className="h-4 w-4 text-green-500" : cat.level === 'Medium' ? AlertTriangle className="h-4 w-4 text-amber-500" : <ShieldX className="h-4 w-4 text-red-500" />
                                                        <span>{cat.name}: <span className="font-semibold">{cat.level}</span></span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/> AI Explanation & Recommendation</h4>
                                            <p className="text-sm mb-3">{result.explanation}</p>
                                            {result.recommendedRewrite && (
                                                <div className='bg-background/50 rounded-md p-3'>
                                                     <div className="flex justify-between items-center mb-1">
                                                        <p className="text-xs font-semibold uppercase text-muted-foreground">Suggested Rewrite</p>
                                                        <Button variant="ghost" size="icon" className='h-7 w-7' onClick={copyRewrite} title="Copy rewrite">
                                                            <ClipboardCopy className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <p className="text-sm font-medium">{result.recommendedRewrite}</p>
                                                </div>
                                            )}
                                        </div>

                                        {result.requiresApproval && (
                                            <div className="flex items-center gap-2 p-3 rounded-lg border-l-4 border-amber-500 bg-amber-500/10">
                                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                                                <p className="text-sm font-semibold text-amber-800">This post requires manager approval before publishing.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}