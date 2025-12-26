import { config } from 'dotenv';
config();

import '@/ai/flows/generate-summaries-for-platform.ts';
import '@/ai/flows/generate-initial-post-ideas.ts';
import '@/ai/flows/analyze-social-sentiment.ts';
import '@/ai/flows/identify-trending-topics.ts';