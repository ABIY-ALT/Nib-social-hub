'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating initial social media post ideas related to a banking product or service.
 *
 * It exports:
 * - `generateInitialPostIdeas`: An async function that takes a product/service description and generates post ideas.
 * - `PostIdeasInput`: The TypeScript type for the input to the flow.
 * - `PostIdeasOutput`: The TypeScript type for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PostIdeasInputSchema = z.object({
  productOrServiceDescription: z
    .string()
    .describe(
      'A detailed description of the banking product or service for which to generate social media post ideas.'
    ),
});

export type PostIdeasInput = z.infer<typeof PostIdeasInputSchema>;

const PostIdeasOutputSchema = z.object({
  postIdeas: z
    .array(z.string())
    .describe('An array of creative and engaging social media post ideas.'),
});

export type PostIdeasOutput = z.infer<typeof PostIdeasOutputSchema>;

export async function generateInitialPostIdeas(
  input: PostIdeasInput
): Promise<PostIdeasOutput> {
  return generateInitialPostIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialPostIdeasPrompt',
  input: {schema: PostIdeasInputSchema},
  output: {schema: PostIdeasOutputSchema},
  prompt: `You are a social media marketing expert for a bank. Generate a list of social media post ideas based on the following product or service description:

Product/Service Description: {{{productOrServiceDescription}}}

Post Ideas (at least 5):
`,
});

const generateInitialPostIdeasFlow = ai.defineFlow(
  {
    name: 'generateInitialPostIdeasFlow',
    inputSchema: PostIdeasInputSchema,
    outputSchema: PostIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
