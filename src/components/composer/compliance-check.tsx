'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CircleDashed, Loader2, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

const checks = [
  "Brand Guideline Adherence",
  "Regulatory Compliance (FINRA, SEC)",
  "Sensitive Keyword Scan",
  "Clarity & Readability Score",
  "Accessibility Standards (WCAG)",
];

export default function ComplianceCheck() {
  const [runningCheck, setRunningCheck] = useState(false);
  const [completedChecks, setCompletedChecks] = useState<string[]>([]);

  const handleRunCheck = () => {
    setRunningCheck(true);
    setCompletedChecks([]);
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < checks.length) {
        setCompletedChecks(prev => [...prev, checks[i]]);
        i++;
      } else {
        clearInterval(interval);
        setRunningCheck(false);
      }
    }, 500);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
        <div className="text-center">
            <h2 className="text-xl font-semibold font-headline mb-2">Pre-Post Review</h2>
            <p className="text-muted-foreground mb-6">Automatically review your content for brand guidelines, regulatory compliance, and more before publishing.</p>
            <Button size="lg" onClick={handleRunCheck} disabled={runningCheck}>
                {runningCheck ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Checks...
                </>
                ) : (
                <>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Run Compliance Check
                </>
                )}
            </Button>
        </div>

        {completedChecks.length > 0 && (
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Compliance Report</CardTitle>
                    <CardDescription>Results from the automated scan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {checks.map((check) => {
                            const isCompleted = completedChecks.includes(check);
                            return (
                                <li key={check} className="flex items-center text-sm font-medium">
                                    {isCompleted ? (
                                        <CheckCircle2 className="h-5 w-5 mr-3 text-green-500" />
                                    ) : (
                                        <CircleDashed className="h-5 w-5 mr-3 text-muted-foreground animate-pulse" />
                                    )}
                                    <span className={isCompleted ? "text-foreground" : "text-muted-foreground"}>
                                        {check}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
