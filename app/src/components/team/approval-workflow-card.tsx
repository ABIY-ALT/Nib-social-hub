'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Edit, User, PenSquare } from "lucide-react";

const workflowSteps = [
    { id: 1, name: "Content Creation", icon: PenSquare, user: "Anyone" },
    { id: 2, name: "Manager Review", icon: User, user: "Manager" },
    { id: 3, name: "Compliance Check", icon: CheckCircle, user: "Compliance Officer" },
];

export default function ApprovalWorkflowCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Approval Workflow</CardTitle>
                <CardDescription>This is the standard path for all new content.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {workflowSteps.map((step, index) => (
                        <li key={step.id} className="flex flex-col">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                                    <step.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">{step.name}</p>
                                    <p className="text-sm text-muted-foreground">by: {step.user}</p>
                                </div>
                            </div>
                            {index < workflowSteps.length - 1 && (
                                <div className="ml-5 mt-2 h-6 border-l-2 border-dashed border-border" />
                            )}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
