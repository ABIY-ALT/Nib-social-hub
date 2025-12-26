'use server';

/**
 * @fileOverview A flow to identify trending topics related to banking and finance on social media using AI.
 *
 * - identifyTrendingTopics - A function that identifies trending topics.
 * - IdentifyTrendingTopicsInput - The input type for the identifyTrendingTopics function.
 * - IdentifyTrendingTopicsOutput - The return type for the identifyTrendingTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyTrendingTopicsInputSchema = z.object({
  socialMediaPlatform: z
    .string()
    .describe('The social media platform to analyze (e.g., Twitter, Facebook, LinkedIn).'),
  topicArea: z
    .string()
    .describe('The specific area within banking and finance to focus on (e.g., personal loans, investment strategies, digital banking).'),
  numberOfTopics: z
    .number()
    .default(5)
    .describe('The number of trending topics to identify.'),
});
export type IdentifyTrendingTopicsInput = z.infer<typeof IdentifyTrendingTopicsInputSchema>;

const IdentifyTrendingTopicsOutputSchema = z.object({
  trendingTopics: z
    .array(z.string())
    .describe('A list of trending topics related to the specified area on the given social media platform.'),
});
export type IdentifyTrendingTopicsOutput = z.infer<typeof IdentifyTrendingTopicsOutputSchema>;

export async function identifyTrendingTopics(input: IdentifyTrendingTopicsInput): Promise<IdentifyTrendingTopicsOutput> {
  return identifyTrendingTopicsFlow(input);
}

const identifyTrendingTopicsPrompt = ai.definePrompt({
  name: 'identifyTrendingTopicsPrompt',
  input: {schema: IdentifyTrendingTopicsInputSchema},
  output: {schema: IdentifyTrendingTopicsOutputSchema},
  prompt: `You are an AI-powered social media analyst specializing in identifying trending topics.

  Analyze the {{socialMediaPlatform}} platform for trending topics related to {{topicArea}}.

  Return the top {{numberOfTopics}} trending topics. Ensure the topics are relevant to banking and finance.

  Trending Topics:
  {{#each trendingTopics}}- {{this}}\n{{/each}}`,
});

const identifyTrendingTopicsFlow = ai.defineFlow(
  {
    name: 'identifyTrendingTopicsFlow',
    inputSchema: IdentifyTrendingTopicsInputSchema,
    outputSchema: IdentifyTrendingTopicsOutputSchema,
  },
  async input => {
    const {output} = await identifyTrendingTopicsPrompt(input);
    return output!;
  }
);
