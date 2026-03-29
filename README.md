# SENTINEL — Autonomous Enterprise Workflow Intelligence

**SENTINEL** is a next-generation orchestration platform designed to replace manual, fragmented enterprise processes with a **Cognitive Mesh** of specialized AI agents. It doesn't just automate; it perceives, executes, verifies, and self-heals.

---

## 🌩️ The Problem
Enterprise workflows (Procurement, Onboarding, Compliance) are currently:
- **Fragile:** A single API failure or missing data point stalls the entire process.
- **Opaque:** Decisions made by "black-box" automations or humans are rarely auditable at a granular level.
- **Human-Dependent:** Humans are often pulled into trivial tasks (data entry, basic verification) rather than high-value oversight.

## 🛡️ The Solution
SENTINEL provides an autonomous ecosystem where:
- **Specialized Agents:** A fleet of agents (Orchestrator, Perceiver, Executor, Verifier, Healer) collaborate to complete tasks.
- **Self-Healing Immune System:** The **Healer Agent** detects failures and applies recovery strategies (rollback, retry, reroute) before bothering a human.
- **Immutable Audit Spine:** Every decision is cryptographically chained, creating a tamper-evident history of the "why" behind every "what."

---

## ✨ Uniqueness
1. **Cognitive Reasoning:** Unlike static flowcharts, SENTINEL uses LLM reasoning to handle "process drift" and edge cases.
2. **SLA-First Design:** The system predicts SLA breaches before they happen and escalates based on business risk, not just technical errors.
3. **Identity-Based Transparency:** Every agent action is tied to a system-wide identity, making "AI Accountability" a core feature.

---

## 🛠️ Technical Stack
- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS.
- **UI Components:** ShadCN UI (Radix Primitives).
- **AI Engine:** [Genkit](https://github.com/firebase/genkit) (Framework) + Google Gemini 2.5 Flash (Models).
- **Backend/Database:** Firebase Firestore (Real-time NoSQL).
- **Authentication:** Firebase Authentication (Anonymous & Password).
- **Visualization:** Recharts (SLA & Performance metrics).

---

## 🏗️ Architectural Overview

```text
[ User Interface ] <---> [ Firebase Auth ]
       |
[ Dashboard / Cockpit ] <---> [ Firestore DB ]
       |                          ^
       v                          |
[ Genkit Agents (Mesh) ] ---------+
    |-- Orchestrator (Plans)
    |-- Perceiver (Gathers)
    |-- Executor (Acts)
    |-- Verifier (Checks)
    |-- Healer (Repairs)
```

### Data Entities
- **Workflows:** The primary instance of an enterprise process.
- **WorkflowSteps:** Granular execution units within a workflow.
- **AuditEntries:** Cryptographically linked records of every action.
- **EpisodicMemory:** Summaries of past runs used by agents to "learn."

---

## 📈 Project Status: Phase 1 (MVP)
### Completed
- [x] **Command Center:** Real-time dashboard for global telemetry.
- [x] **Workflow Registry:** Launching and monitoring autonomous processes.
- [x] **Agent Fleet Registry:** Health and cognitive load tracking for all nodes.
- [x] **Audit Log:** Visualizing the "Immutable Spine" of decisions.
- [x] **SLA Analytics:** Basic compliance and duration trend visualization.
- [x] **Genkit Integration:** Core "Healer" and "Orchestration" reasoning flows implemented.

### In Progress
- [ ] **Real-time Agent Execution:** Transitioning from simulated reasoning to actual tool-calling.
- [ ] **Notification Center:** In-app alerts for SLA risks.

---

## 🚩 THE MAJOR PROBLEM (Current Limitation)
**The "Spine" is Client-Bound.**
Currently, SENTINEL suffers from two critical architectural risks that must be addressed before production:

1. **Client-Side Cryptographic Trust:** Audit hashes are generated in the browser. A malicious user can modify data and re-calculate the "integrity" hashes locally. **Fix:** Move hashing and audit writing to Firebase Cloud Functions (Trusted Environment).
2. **Session Dependency:** Agents are triggered via Server Actions from the client. If the user closes the tab, the "autonomous" agent dies. **Fix:** Transition to Firestore-triggered Cloud Functions so the mesh lives entirely on the server.

---

## 🚀 Future Roadmap
- **Phase 2:** Move agent execution to the server (Cloud Functions) for true 24/7 autonomy.
- **Phase 3:** Hardware Security Module (HSM) integration for root-of-trust audit signing.
- **Phase 4:** "Mesh Learning" — Agents use Episodic Memory to optimize their own paths based on historical success rates.
