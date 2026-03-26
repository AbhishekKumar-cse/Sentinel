'use server';
/**
 * @fileOverview A perception AI agent that gathers information for workflow steps.
 *
 * - perceiverAgent - A function that handles data gathering, validation, and reporting for a workflow step.
 * - PerceiverAgentInput - The input type for the perceiverAgent function.
 * - PerceiverAgentOutput - The return type for the perceiverAgent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { readFirestoreDocument, queryFirestore } from '@/genkit/tools/firestoreTools';
import { readEmail, searchEmails } from '@/genkit/tools/emailTools';
import { readCalendarEvents } from '@/genkit/tools/calendarTools';
import { fetchExternalAPI } from '@/genkit/tools/apiTools';
import { readUploadedDocument } from '@/genkit/tools/storageTools';
import { writeAuditEntry } from '@/genkit/tools/auditTools';

const PerceiverAgentInputSchema = z.object({
  workflowId: z.string().describe('The ID of the current workflow.'),
  stepName: z.string().describe('The name of the current workflow step.'),
  stepDescription: z.string().describe('A description of the current workflow step.'),
  dataRequirements: z.array(z.string()).describe('List of data points needed for the current step.'),
  contextHints: z.record(z.any()).describe('Hints or additional context from the orchestrator.'),
});
export type PerceiverAgentInput = z.infer<typeof PerceiverAgentInputSchema>;

const PerceiverAgentOutputSchema = z.object({
  gatheredData: z.record(z.any()).describe('All data found from various sources.'),
  dataCompleteness: z.number().min(0).max(1).describe('A score (0-1) indicating how complete the gathered data is.'),
  missingData: z.array(z.string()).describe('A list of data points that could not be found or retrieved.'),
  sources: z.array(z.object({
    type: z.string().describe("Type of source (e.g., 'firestore', 'email', 'api')."),
    identifier: z.string().describe("Identifier for the source (e.g., 'collectionName', 'emailId', 'url')."),
    retrievedAt: z.string().datetime().describe('Timestamp when the data was retrieved in ISO 8601 format.')
  })).describe('List of sources from which data was gathered.'),
  reasoning: z.string().describe('Chain-of-thought process used by the agent to gather data and determine completeness.'),
  confidence: z.number().min(0).max(1).describe('Confidence score (0-1) in the completeness and accuracy of the gathered data.'),
});
export type PerceiverAgentOutput = z.infer<typeof PerceiverAgentOutputSchema>;

export async function perceiverAgent(input: PerceiverAgentInput): Promise<PerceiverAgentOutput> {
  return perceiverAgentFlow(input);
}

const perceiverAgentPrompt = ai.definePrompt({
  name: 'perceiverAgentPrompt',
  input: { schema: PerceiverAgentInputSchema },
  output: { schema: PerceiverAgentOutputSchema },
  tools: [
    readFirestoreDocument,
    queryFirestore,
    readEmail,
    searchEmails,
    readCalendarEvents,
    fetchExternalAPI,
    readUploadedDocument,
    writeAuditEntry,
  ],
  prompt: `You are SENTINEL's perception agent. Your task is to gather data from all available sources to 
inform the current workflow step: '{{{stepName}}} - {{{stepDescription}}}'. Be thorough — missing data causes failures downstream.

Here are the data points you need to gather:
{{#each dataRequirements}}- {{{this}}}
{{/each}}

Here is some additional context from the orchestrator:
{{{json contextHints}}}

For each piece of required data:
1. Identify which tool or source has it (Firestore, email, calendar, external API, uploaded documents).
2. Retrieve it using the appropriate tool.
3. Validate it makes sense (e.g., type check, range check, non-null).
4. Record the source for audit purposes, including the type, identifier, and retrieval timestamp.

If data is partially available, do not block — report the completeness score and proceed 
with what you have. The orchestrator will decide if it's sufficient.

Finally, provide your reasoning, a confidence score, and a list of any data that could not be found.

Carefully consider all available tools and the input requirements to gather the most accurate and complete data possible.

Begin your reasoning and data gathering process now.`,
});

const perceiverAgentFlow = ai.defineFlow(
  {
    name: 'perceiverAgent',
    inputSchema: PerceiverAgentInputSchema,
    outputSchema: PerceiverAgentOutputSchema,
  },
  async (input) => {
    const { output } = await perceiverAgentPrompt(input);
    if (!output) {
      throw new Error('Perceiver agent prompt failed to produce an output.');
    }
    // The LLM should produce the structured output directly, including gatheredData, completeness, etc.
    return output;
  }
);
