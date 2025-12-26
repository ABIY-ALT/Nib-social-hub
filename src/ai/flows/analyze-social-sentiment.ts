'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing social media sentiment related to the bank.
 *
 * analyzeSocialSentiment - Analyzes the sentiment of social media posts related to the bank.
 * AnalyzeSocialSentimentInput - The input type for the analyzeSocialSentiment function.
 * AnalyzeSocialSentimentOutput - The return type for the analyzeSocialSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSocialSentimentInputSchema = z.object({
  socialMediaPost: z
    .string() // Removed the data URI requirement
    .describe('The social media post content to analyze.'),
});
export type AnalyzeSocialSentimentInput = z.infer<
  typeof AnalyzeSocialSentimentInputSchema
>;

const AnalyzeSocialSentimentOutputSchema = z.object({
  sentimentScore: z
    .number()
    .describe(
      'A numerical score representing the sentiment of the post.  Positive values indicate positive sentiment, negative values indicate negative sentiment, and values close to zero indicate neutral sentiment.'
    ),
  sentimentLabel: z
    .string()
    .describe(
      'A label indicating the overall sentiment of the post (e.g., Positive, Negative, Neutral).'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the sentiment analysis, explaining why the post was classified as positive, negative, or neutral.'
    ),
});
export type AnalyzeSocialSentimentOutput = z.infer<
  typeof AnalyzeSocialSentimentOutputSchema
>;

export async function analyzeSocialSentiment(
  input: AnalyzeSocialSentimentInput
): Promise<AnalyzeSocialSentimentOutput> {
  return analyzeSocialSentimentFlow(input);
}

const analyzeSocialSentimentPrompt = ai.definePrompt({
  name: 'analyzeSocialSentimentPrompt',
  input: {schema: AnalyzeSocialSentimentInputSchema},
  output: {schema: AnalyzeSocialSentimentOutputSchema},
  prompt: `You are an AI-powered social media sentiment analyzer for a bank.  Analyze the following social media post and determine its sentiment.

Social Media Post: {{{socialMediaPost}}}

Provide a sentiment score, a sentiment label, and a brief explanation of your reasoning. The sentiment score should be a number between -1 and 1, where -1 is very negative, 0 is neutral, and 1 is very positive. 

Output in JSON format according to the schema descriptions.`,
});

const analyzeSocialSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSocialSentimentFlow',
    inputSchema: AnalyzeSocialSentimentInputSchema,
    outputSchema: AnalyzeSocialSentimentOutputSchema,
  },
  async input => {
    const {output} = await analyzeSocialSentimentPrompt(input);
    return output!;
  }
);
