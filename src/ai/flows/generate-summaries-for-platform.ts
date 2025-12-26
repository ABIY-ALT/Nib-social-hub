'use server';
/**
 * @fileOverview A flow that summarizes conversations relevant to the bank's brand across multiple social platforms.
 *
 * - generateSummariesForPlatform - A function that generates summaries of social media conversations.
 * - GenerateSummariesForPlatformInput - The input type for the generateSummariesForPlatform function.
 * - GenerateSummariesForPlatformOutput - The return type for the generateSummariesForPlatform function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSummariesForPlatformInputSchema = z.object({
  platform: z.string().describe('The social media platform to analyze (e.g., Facebook, X, Instagram).'),
  brandKeywords: z.string().describe('Keywords related to the bank brand to filter conversations.'),
  conversationData: z.string().describe('JSON string containing the conversation data from the social media platform.'),
});
export type GenerateSummariesForPlatformInput = z.infer<typeof GenerateSummariesForPlatformInputSchema>;

const GenerateSummariesForPlatformOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the conversations related to the bank brand on the specified platform.'),
  sentiment: z.string().describe('Overall sentiment (positive, negative, neutral) expressed in the conversations.'),
  keyTrends: z.string().describe('Identified trends and topics emerging from the conversations.'),
});
export type GenerateSummariesForPlatformOutput = z.infer<typeof GenerateSummariesForPlatformOutputSchema>;

export async function generateSummariesForPlatform(input: GenerateSummariesForPlatformInput): Promise<GenerateSummariesForPlatformOutput> {
  return generateSummariesForPlatformFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSummariesForPlatformPrompt',
  input: {schema: GenerateSummariesForPlatformInputSchema},
  output: {schema: GenerateSummariesForPlatformOutputSchema},
  prompt: `You are a social media analyst tasked with summarizing conversations related to the bank brand.

  Analyze the conversation data from {{platform}} using the following brand keywords: {{brandKeywords}}.

  Conversation Data:
  {{conversationData}}

  Provide a concise summary, identify the overall sentiment, and highlight key trends emerging from the conversations.

  Summary:
  Sentiment:
  Key Trends:`,
});

const generateSummariesForPlatformFlow = ai.defineFlow(
  {
    name: 'generateSummariesForPlatformFlow',
    inputSchema: GenerateSummariesForPlatformInputSchema,
    outputSchema: GenerateSummariesForPlatformOutputSchema,
  },
  async input => {
    try {
      // Attempt to parse the conversation data.  If it fails, proceed anyway and let the LLM handle it.
      JSON.parse(input.conversationData);
    } catch (e) {
      console.warn('Could not parse conversation data as JSON, proceeding anyway.', e);
    }

    const {output} = await prompt(input);
    return output!;
  }
);
