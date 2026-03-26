'use server';
/**
 * @fileOverview A meeting intelligence AI agent that processes meeting transcripts.
 *
 * - meetingAgent - A function that orchestrates the meeting intelligence process.
 * - MeetingAgentInput - The input type for the meetingAgent function.
 * - MeetingAgentOutput - The return type for the meetingAgent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MeetingAgentInputSchema = z.object({
  meetingId: z.string().describe('Unique identifier for the meeting.'),
  transcript: z.string().describe('Full meeting transcript text.'),
  attendees: z.array(
    z.object({
      name: z.string().describe("Attendee's name."),
      email: z.string().describe("Attendee's email."),
      role: z.string().describe("Attendee's role."),
    })
  ).describe('List of meeting attendees with their details.'),
  meetingTitle: z.string().describe('Title of the meeting.'),
  meetingDate: z.string().describe('Date of the meeting in a parseable string format (e.g., "YYYY-MM-DD").'),
  previousActionItems: z.array(
    z.object({
      id: z.string().describe('Unique ID of the previous action item.'),
      task: z.string().describe('Description of the previous action item task.'),
      owner: z.string().describe('Owner of the previous action item.'),
      status: z.string().describe('Current status of the previous action item.'),
    })
  ).optional().describe('Optional list of action items from previous meetings to check their status.'),
});
export type MeetingAgentInput = z.infer<typeof MeetingAgentInputSchema>;

const MeetingAgentOutputSchema = z.object({
  summary: z.string().describe('A 3-5 sentence executive summary of the meeting.'),
  decisions: z.array(
    z.object({
      decision: z.string().describe('The decision made during the meeting.'),
      madeBy: z.string().describe('Who made the decision.'),
      rationale: z.string().describe('The reasoning behind the decision.'),
      impact: z.enum(['low', 'medium', 'high']).describe('Impact level of the decision.'),
    })
  ).describe('List of key decisions identified in the transcript.'),
  actionItems: z.array(
    z.object({
      id: z.string().describe('Unique ID for the action item.'),
      task: z.string().describe('Description of the action item task.'),
      owner: z.string().describe('Committed owner of the action item.'),
      ownerEmail: z.string().describe("Owner's email for notification."),
      deadline: z.string().describe('Realistic deadline for the action item (YYYY-MM-DD format).'),
      priority: z.enum(['low', 'medium', 'high', 'critical']).describe('Priority level of the action item.'),
      dependsOn: z.array(z.string()).describe('IDs of prerequisite action items.'),
      estimatedEffortHours: z.number().describe('Estimated effort in hours to complete the action item.'),
    })
  ).describe('List of structured action items extracted from the transcript.'),
  previousItemsStatus: z.array(
    z.object({
      id: z.string().describe('ID of the previous action item.'),
      wasDiscussed: z.boolean().describe('Whether this previous action item was discussed in the current meeting.'),
      newStatus: z.string().describe('The updated status of the previous action item.'),
      note: z.string().describe('Any notes regarding the status update.'),
    })
  ).describe('Updates on previous action items discussed in the meeting.'),
  risksIdentified: z.array(z.string()).describe('List of risks identified or mentioned during the meeting.'),
  nextMeetingNeeded: z.boolean().describe('True if a follow-up meeting is needed.'),
  nextMeetingTopics: z.array(z.string()).describe('Suggested topics for the next meeting.'),
});
export type MeetingAgentOutput = z.infer<typeof MeetingAgentOutputSchema>;

export async function meetingAgent(input: MeetingAgentInput): Promise<MeetingAgentOutput> {
  return meetingAgentFlow(input);
}

const meetingAgentPrompt = ai.definePrompt({
  name: 'meetingAgentPrompt',
  input: { schema: MeetingAgentInputSchema },
  output: { schema: MeetingAgentOutputSchema },
  prompt: `You are SENTINEL's meeting intelligence agent. You transform raw meeting transcripts
into structured, actionable intelligence.

Processing rules:
1. Extract EVERY decision made, even implicit ones ("we'll go with option B")
2. For each action item: identify the committed owner (who said they'd do it, not
   who was assigned), set a realistic deadline (default: 5 business days if not stated, e.g. "YYYY-MM-DD"),
   and estimate effort
3. Check previous action items — if mentioned in transcript, update their status
4. Flag stalled items (items from previous meetings not discussed AND overdue)
   for automatic escalation
5. Identify risks mentioned, even casually ("I'm worried about the timeline")

Be precise with owner names — match to the attendees list provided.
If an owner is unclear, assign to the meeting organizer and flag for clarification.

Meeting ID: {{{meetingId}}}
Meeting Title: {{{meetingTitle}}}
Meeting Date: {{{meetingDate}}}

Attendees:
{{#each attendees}}
- Name: {{{name}}}, Email: {{{email}}}, Role: {{{role}}}
{{/each}}

{{#if previousActionItems}}
Previous Action Items:
{{#each previousActionItems}}
- ID: {{{id}}}, Task: {{{task}}}, Owner: {{{owner}}}, Status: {{{status}}}
{{/each}}
{{/if}}

Meeting Transcript:
{{{transcript}}}`,
});

const meetingAgentFlow = ai.defineFlow(
  {
    name: 'meetingAgentFlow',
    inputSchema: MeetingAgentInputSchema,
    outputSchema: MeetingAgentOutputSchema,
  },
  async (input) => {
    const { output } = await meetingAgentPrompt(input);
    if (!output) {
      throw new Error('Failed to extract meeting intelligence.');
    }
    return output;
  }
);
