'use server';
/**
 * @fileOverview A self-healing AI agent responsible for detecting, diagnosing, and recovering from workflow failures.
 * It analyzes error details and workflow context to determine the best recovery strategy and associated actions.
 *
 * - healerAgent - A function that handles the self-healing process.
 * - HealerAgentInput - The input type for the healerAgent function.
 * - HealerAgentOutput - The return type for the healerAgent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Dummy tool definitions for the prompt, assuming these are defined and exported elsewhere
// within the genkit/tools or genkit/memory directories in a complete project.
// For this single file generation, they are defined locally to satisfy the 'tools' array requirement.
const getFailureHistory = ai.defineTool(
  {
    name: 'getFailureHistory',
    description: 'Retrieves the history of failures for a given workflow step.',
    inputSchema: z.object({
      workflowId: z.string(),
      stepId: z.string(),
    }),
    outputSchema: z.array(z.record(z.any())),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: getFailureHistory called with ${JSON.stringify(input)}`);
    return [];
  }
);

const getEpisodicMemoryTool = ai.defineTool(
  {
    name: 'getEpisodicMemory',
    description: 'Retrieves past healing attempts for similar issues from episodic memory.',
    inputSchema: z.object({
      failureType: z.string(),
      limit: z.number(),
    }),
    outputSchema: z.array(z.string()),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: getEpisodicMemory called with ${JSON.stringify(input)}`);
    return [];
  }
);

const rollbackAction = ai.defineTool(
  {
    name: 'rollbackAction',
    description: 'Undoes a previous action taken by an executor agent.',
    inputSchema: z.object({
      workflowId: z.string(),
      stepId: z.string(),
      rollbackInfo: z.record(z.any()),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: rollbackAction called with ${JSON.stringify(input)}`);
    return true;
  }
);

const retryStep = ai.defineTool(
  {
    name: 'retryStep',
    description: 'Queues a workflow step for retry with new parameters.',
    inputSchema: z.object({
      workflowId: z.string(),
      stepId: z.string(),
      newParams: z.record(z.any()),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: retryStep called with ${JSON.stringify(input)}`);
    return true;
  }
);

const skipStep = ai.defineTool(
  {
    name: 'skipStep',
    description: 'Marks a workflow step as skipped with an optional compensation note.',
    inputSchema: z.object({
      workflowId: z.string(),
      stepId: z.string(),
      compensationNote: z.string().optional(),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: skipStep called with ${JSON.stringify(input)}`);
    return true;
  }
);

const rerouteWorkflow = ai.defineTool(
  {
    name: 'rerouteWorkflow',
    description: 'Changes the workflow path to an alternative set of steps.',
    inputSchema: z.object({
      workflowId: z.string(),
      alternativeStepIds: z.array(z.string()),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: rerouteWorkflow called with ${JSON.stringify(input)}`);
    return true;
  }
);

const writeEpisodicMemoryTool = ai.defineTool(
  {
    name: 'writeEpisodicMemory',
    description: 'Stores a summary of a healing attempt and its outcome in episodic memory.',
    inputSchema: z.object({
      summary: z.string(),
      workflowType: z.string(),
      failureType: z.string(),
      strategy: z.string(),
      outcome: z.enum(['success', 'failure', 'partial']),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: writeEpisodicMemory called with ${JSON.stringify(input)}`);
    return true;
  }
);

const createApprovalRequestTool = ai.defineTool(
  {
    name: 'createApprovalRequest',
    description: 'Creates a human approval request.',
    inputSchema: z.object({
      workflowId: z.string(),
      stepId: z.string(),
      approverId: z.string(),
      urgencyDetails: z.string(),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: createApprovalRequest called with ${JSON.stringify(input)}`);
    return true;
  }
);

const writeAuditEntryTool = ai.defineTool(
  {
    name: 'writeAuditEntry',
    description: "Writes a tamper-evident audit entry to the workflow's audit chain.",
    inputSchema: z.object({
      workflowId: z.string(),
      agentId: z.string(),
      agentType: z.string(),
      action: z.string(),
      decision: z.string(),
      stepId: z.string(),
      data: z.record(z.any()),
    }),
    outputSchema: z.object({
      auditEntryId: z.string(),
      hash: z.string(),
      sequence: z.number(),
    }),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: writeAuditEntry called with ${JSON.stringify(input)}`);
    return { auditEntryId: 'dummy', hash: 'dummy', sequence: 0 };
  }
);

const sendNotificationTool = ai.defineTool(
  {
    name: 'sendNotification',
    description: 'Sends a notification to a specified user.',
    inputSchema: z.object({
      userId: z.string(),
      type: z.string(),
      title: z.string(),
      message: z.string(),
      workflowId: z.string().optional(),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: sendNotification called with ${JSON.stringify(input)}`);
    return true;
  }
);

const updateAgentHealth = ai.defineTool(
  {
    name: 'updateAgentHealth',
    description: 'Updates the health score and status of an agent.',
    inputSchema: z.object({
      agentId: z.string(),
      healthScore: z.number(),
      status: z.enum(['idle', 'working', 'errored', 'offline']),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Placeholder implementation
    console.log(`Tool: updateAgentHealth called with ${JSON.stringify(input)}`);
    return true;
  }
);

// --- Input Schema ---
const HealerAgentInputSchema = z.object({
  workflowId: z.string().describe('The ID of the workflow that encountered a failure.'),
  failedStepId: z.string().describe('The ID of the step that failed.'),
  failureType: z.enum([
    'agent_error',
    'tool_failure',
    'data_missing',
    'validation_failed',
    'timeout',
    'api_error',
    'sla_at_risk',
    'process_drift',
  ]).describe('The categorized type of the failure.'),
  errorDetails: z.object({
    message: z.string().describe('A detailed error message.'),
    stackTrace: z.string().optional().describe('Optional stack trace for code errors.'),
    failedTool: z.string().optional().describe('The name of the tool that failed, if applicable.'),
    retryCount: z.number().describe('The number of times this step has been retried so far.'),
  }).describe('Detailed information about the error.'),
  workflowContext: z.record(z.any()).describe('A snapshot of the workflow state and relevant data at the time of failure.'),
  episodicMemory: z.array(z.string()).describe('Summaries of past healing attempts for similar issues.'),
});
export type HealerAgentInput = z.infer<typeof HealerAgentInputSchema>;

// --- Output Schema ---
const HealerAgentOutputSchema = z.object({
  canSelfHeal: z.boolean().describe('Whether the agent believes it can resolve the issue autonomously.'),
  recoveryStrategy: z.enum([
    'retry_with_different_params',
    'skip_and_compensate',
    'rollback_and_restart_step',
    'reroute_to_alternative_path',
    'request_human_intervention',
  ]).describe('The chosen strategy to recover from the failure.'),
  recoveryActions: z.array(
    z.object({
      action: z.string().describe('A descriptive name for the action to be taken.'),
      params: z.record(z.any()).describe('Parameters required to execute the action.'),
      order: z.number().describe('The sequential order in which this action should be executed.'),
    })
  ).describe('A list of concrete actions to implement the recovery strategy.'),
  reasoning: z.string().describe('The full chain-of-thought behind the chosen recovery strategy.'),
  confidence: z.number().describe('A confidence score (0-1) in the chosen strategy and its likely success.'),
  estimatedRecoveryTimeMinutes: z.number().describe('Estimated time in minutes to resolve the issue.'),
  preventionRecommendation: z.string().describe('A recommendation to prevent similar failures in future workflow runs, for episodic memory.'),
});
export type HealerAgentOutput = z.infer<typeof HealerAgentOutputSchema>;

const healerAgentPrompt = ai.definePrompt({
  name: 'healerAgentPrompt',
  input: { schema: HealerAgentInputSchema },
  output: { schema: HealerAgentOutputSchema },
  tools: [
    getFailureHistory,
    getEpisodicMemoryTool,
    rollbackAction,
    retryStep,
    skipStep,
    rerouteWorkflow,
    writeEpisodicMemoryTool,
    createApprovalRequestTool,
    writeAuditEntryTool,
    sendNotificationTool,
    updateAgentHealth,
  ],
  prompt: `You are SENTINEL's immune system — the self-healing agent. When workflows break,
  you diagnose and fix them autonomously.

  You have been invoked for workflow '{{{workflowId}}}', step '{{{failedStepId}}}' due to a '{{{failureType}}}' error.
  Error Details: {{{errorDetails.message}}}
  Current Workflow Context: {{{JSON.stringify workflowContext}}}
  Episodic Memory for similar issues: {{{episodicMemory}}}

  Healing decision framework:

  1. RETRY WITH DIFFERENT PARAMS: Use when API timed out, transient error, or
     data format was wrong. Change parameters and retry.
     Example: If the error was an API timeout or a transient network issue,
              you might recommend 'retry_with_different_params'.
              If the error indicates a malformed input, you might suggest retrying with corrected parameters derived from workflowContext.

  2. SKIP AND COMPENSATE: Use when a non-critical step fails and an alternative
     path exists. Document what was skipped and add compensating step.
     Example: If a notification email failed to send but the primary action completed,
              you might 'skip_and_compensate' by logging the failure and notifying an admin directly.

  3. ROLLBACK AND RESTART STEP: Use when data was partially written, creating
     inconsistency. Use rollback info from executor to undo, then restart cleanly.
     Example: If a database write partially completed, leaving inconsistent state,
              you would 'rollback_and_restart_step' using the rollback information from the executor's output.

  4. REROUTE TO ALTERNATIVE PATH: Use when the primary path is definitively blocked
     but an alternative workflow path can achieve the same outcome.
     Example: If a specific vendor API is down for an extended period,
              you might 'reroute_to_alternative_path' to use a backup vendor or manual process.

  5. REQUEST HUMAN INTERVENTION: LAST RESORT ONLY. Use only when:
     - All retry attempts exhausted (>= 3)
     - No alternative path exists
     - Data integrity is at risk
     - Financial or legal action cannot be automated
     Example: If repeated attempts to fix a critical financial transaction fail,
              you must 'request_human_intervention'.

  Learn from episodic memory. If this exact failure was healed before, use that strategy.
  Always write a prevention recommendation for the episodic memory store.

  Consider the current error details and workflow context. Diagnose the root cause, propose a recovery strategy,
  list the specific actions needed for recovery (using available tools), estimate recovery time,
  and suggest a prevention recommendation for future runs.
  Be confident in your decision and provide clear reasoning.
  
  Available Tools:
  - getFailureHistory(workflowId, stepId): Retrieves the history of failures for a given workflow step.
  - getEpisodicMemory(failureType, limit): Retrieves past healing attempts for similar issues from episodic memory.
  - rollbackAction(workflowId, stepId, rollbackInfo): Undoes a previous action taken by an executor agent.
  - retryStep(workflowId, stepId, newParams): Queues a workflow step for retry with new parameters.
  - skipStep(workflowId, stepId, compensationNote): Marks a workflow step as skipped with an optional compensation note.
  - rerouteWorkflow(workflowId, alternativeStepIds): Changes the workflow path to an alternative set of steps.
  - writeEpisodicMemory(summary, workflowType, failureType, strategy, outcome): Stores a summary of a healing attempt and its outcome in episodic memory.
  - createApprovalRequest(workflowId, stepId, approverId, urgencyDetails): Creates a human approval request.
  - writeAuditEntry(workflowId, agentId, action, decision, data): Writes a tamper-evident audit entry to the workflow\'s audit chain.
  - sendNotification(userId, type, title, message, workflowId): Sends a notification to a specified user.
  - updateAgentHealth(agentId, healthScore, status): Updates the health score and status of an agent.
  `,
});

const healerAgentFlow = ai.defineFlow(
  {
    name: 'healerAgentFlow',
    inputSchema: HealerAgentInputSchema,
    outputSchema: HealerAgentOutputSchema,
  },
  async (input) => {
    const { output } = await healerAgentPrompt(input);
    return output!;
  }
);

export async function healerAgent(input: HealerAgentInput): Promise<HealerAgentOutput> {
  return healerAgentFlow(input);
}
