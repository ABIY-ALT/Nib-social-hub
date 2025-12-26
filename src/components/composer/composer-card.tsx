'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, PenLine, ShieldCheck } from 'lucide-react';
import AiIdeaGenerator from './ai-idea-generator';
import PostEditor from './post-editor';
import ComplianceCheck from './compliance-check';

export default function ComposerCard() {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="create" className="relative">
          <div className="p-4 border-b">
            <TabsList>
              <TabsTrigger value="create">
                <PenLine className="mr-2 h-4 w-4" />
                Create
              </TabsTrigger>
              <TabsTrigger value="ai-ideas">
                <Bot className="mr-2 h-4 w-4" />
                AI Ideas
              </TabsTrigger>
              <TabsTrigger value="review">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Review & Comply
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="create" className="p-4 md:p-6">
            <PostEditor />
          </TabsContent>
          <TabsContent value="ai-ideas" className="p-4 md:p-6">
            <AiIdeaGenerator />
          </TabsContent>
          <TabsContent value="review" className="p-4 md:p-6">
            <ComplianceCheck />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
