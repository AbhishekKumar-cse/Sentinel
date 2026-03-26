'use server';
/**
 * @fileOverview A Genkit flow for the master orchestration agent of SENTINEL.
 *
 * - autonomousWorkflowOrchestration - A function that orchestrates enterprise workflows.
 * - AutonomousWorkflowOrchestrationInput - The input type for the autonomousWorkflowOrchestration function.
 * - AutonomousWorkflowOrchestrationOutput - The return type for the autonomousWorkflowOrchestration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutonomousWorkflowOrchestrationInputSchema = z.object({
  workflowId: z.string().describe('The ID of the workflow being orchestrated.'),
  workflowType: z.enum(['procurement', 'onboarding', 'meeting', 'custom']).describe('The type of the current workflow.'),
  currentState: z.object({
    completedSteps: z.array(z.string()).describe('List of IDs of steps already completed.'),
    currentStepIndex: z.number().describe('The index of the current step in the workflow.'),
    totalSteps: z.number().describe('The total number of steps in the workflow.'),
    workflowInput: z.record(z.any()).describe('The initial input data for the workflow.'),
    lastStepOutput: z.record(z.any()).optional().describe('The output data from the immediately preceding step.'),
    errorHistory: z.array(z.object({
      step: z.string().describe('The ID of the step where the error occurred.'),
      error: z.string().describe('The error message.'),
      timestamp: z.string().describe('ISO timestamp of when the error occurred.'),
    })).describe('A history of errors encountered in the workflow.'),
    episodicMemory: z.array(z.string()).describe('Summaries of similar past workflow runs for learning.'),
  }).describe('The current state of the workflow.'),
});
export type AutonomousWorkflowOrchestrationInput = z.infer<typeof AutonomousWorkflowOrchestrationInputSchema>;

const AutonomousWorkflowOrchestrationOutputSchema = z.object({
  nextAction: z.enum(['execute_step', 'skip_step', 'request_human', 'invoke_healer', 'complete_workflow', 'abort_workflow']).describe('The next action the orchestrator decides to take.'),
  nextStepIndex: z.number().optional().describe('The index of the next step to execute, if applicable.'),
  reasoning: z.string().describe('The full chain-of-thought reasoning behind the decision.'),
  confidenceScore: z.number().min(0).max(1).describe('A confidence score (0-1) for the decision.'),
  estimatedStepsRemaining: z.number().describe('The estimated number of steps remaining until workflow completion.'),
  slaRisk: z.enum(['low', 'medium', 'high']).describe('The current SLA risk level for the workflow.'),
  agentToInvoke: z.enum(['perceiver', 'executor', 'verifier', 'healer']).optional().describe('The specialized agent to invoke for the next action, if applicable.'),
  humanApprovalRequired: z.boolean().describe('Whether human approval is required for the next action.'),
  humanApprovalReason: z.string().optional().describe('The reason human approval is being requested.'),
});
export type AutonomousWorkflowOrchestrationOutput = z.infer<typeof AutonomousWorkflowOrchestrationOutputSchema>;

// Placeholder tool definitions. These would typically be imported from `genkit/tools/*.ts`.
// The full implementation of these tools will be in their respective tool files.
const getWorkflowState = ai.defineTool({
  name: 'getWorkflowState',
  description: 'Reads current workflow state from Firestore.',
  inputSchema: z.object({ workflowId: z.string() }),
  outputSchema: z.record(z.any()),
}, async (input) => { return {}; /* Implementation in genkit/tools/firestoreTools.ts */ });

const getEpisodicMemory = ai.defineTool({
  name: 'getEpisodicMemory',
  description: 'Retrieves past similar workflow summaries from episodic memory.',
  inputSchema: z.object({ workflowType: z.string(), limit: z.number().optional() }),
  outputSchema: z.array(z.string()),
}, async (input) => { return []; /* Implementation in genkit/memory/episodicMemory.ts */ });

const updateWorkflowStatus = ai.defineTool({
  name: 'updateWorkflowStatus',
  description: 'Updates workflow status and current step index in Firestore.',
  inputSchema: z.object({
    workflowId: z.string(),
    status: z.enum(['queued', 'running', 'awaiting_human', 'self_healing', 'completed', 'failed', 'cancelled']),
    currentStepIndex: z.number().optional(),
  }),
  outputSchema: z.object({ success: z.boolean() }),
}, async (input) => { return { success: true }; /* Implementation in genkit/tools/firestoreTools.ts */ });

const writeAuditEntry = ai.defineTool({
  name: 'writeAuditEntry',
  description: 'Writes a tamper-evident audit entry to the workflow\'s audit chain.',
  inputSchema: z.object({
    workflowId: z.string(),
    agentId: z.string(),
    agentType: z.string(),
    action: z.string(),
    decision: z.string(),
    stepId: z.string(),
    data: z.record(z.any()),
  }),
  outputSchema: z.object({ auditEntryId: z.string(), hash: z.string(), sequence: z.number() }),
}, async (input) => { return { auditEntryId: 'tempId', hash: 'tempHash', sequence: 0 }; /* Implementation in genkit/tools/auditTools.ts */ });

const sendNotification = ai.defineTool({
  name: 'sendNotification',
  description: 'Creates a notification for a specified user.',
  inputSchema: z.object({
    userId: z.string(),
    type: z.string(),
    title: z.string(),
    message: z.string(),
    workflowId: z.string().optional(),
  }),
  outputSchema: z.object({ notificationId: z.string() }),
}, async (input) => { return { notificationId: 'tempId' }; /* Implementation in genkit/tools/notificationTools.ts */ });

const predictSLABreach = ai.defineTool({
  name: 'predictSLABreach',
  description: 'Predicts the SLA breach risk level for a workflow.',
  inputSchema: z.object({ workflowId: z.string() }),
  outputSchema: z.object({
    willBreach: z.boolean(),
    predictedBreachAt: z.string().optional(),
    confidence: z.number(),
    reason: z.string(),
  }),
}, async (input) => { return { willBreach: false, confidence: 0.9, reason: 'No breach predicted' }; /* Implementation in lib/sla/slaPredictor.ts */ });

const autonomousWorkflowOrchestrationPrompt = ai.definePrompt({
  name: 'autonomousWorkflowOrchestrationPrompt',
  input: {schema: AutonomousWorkflowOrchestrationInputSchema},
  output: {schema: AutonomousWorkflowOrchestrationOutputSchema},
  tools: [
    getWorkflowState,
    getEpisodicMemory,
    updateWorkflowStatus,
    writeAuditEntry,
    sendNotification,
    predictSLABreach,
  ],
  prompt: `You are SENTINEL's master orchestration agent. Your role is to manage the execution of 
  enterprise workflows with maximum autonomy and minimum human involvement. 
  
  You have access to the complete workflow state, error history, and episodic memory of 
  similar past runs. Your job is to decide:
  1. What the next action should be
  2. Which specialized agent should handle it
  3. Whether human approval is genuinely necessary (minimize this)
  4. The confidence in your decision
  
  Decision framework:
  - If a step has failed < 3 times: invoke healer agent before escalating to human
  - Only request human approval for: financial decisions > $10,000, legal documents, 
    terminations, and situations where all automated recovery has failed
  - Learn from episodic memory: if a similar workflow succeeded with a certain approach, prefer it
  - Always explain your reasoning step by step before stating your decision
  
  Be decisive. Avoid unnecessary human escalation. The goal is maximum autonomous completion.

  Workflow ID: {{{workflowId}}}
  Workflow Type: {{{workflowType}}}
  Current State:
    Completed Steps: {{{currentState.completedSteps}}}
    Current Step Index: {{{currentState.currentStepIndex}}}
    Total Steps: {{{currentState.totalSteps}}}
    Workflow Input: {{{json currentState.workflowInput}}}
    {{#if currentState.lastStepOutput}}Last Step Output: {{{json currentState.lastStepOutput}}}{{/if}}
    Error History: {{{json currentState.errorHistory}}}
    Episodic Memory: {{{json currentState.episodicMemory}}}
  `,
});

const autonomousWorkflowOrchestrationFlow = ai.defineFlow(
  {
    name: 'autonomousWorkflowOrchestrationFlow',
    inputSchema: AutonomousWorkflowOrchestrationInputSchema,
    outputSchema: AutonomousWorkflowOrchestrationOutputSchema,
  },
  async (input) => {
    const {output} = await autonomousWorkflowOrchestrationPrompt(input);
    return output!;
  }
);

export async function autonomousWorkflowOrchestration(input: AutonomousWorkflowOrchestrationInput): Promise<AutonomousWorkflowOrchestrationOutput> {
  return autonomousWorkflowOrchestrationFlow(input);
}
