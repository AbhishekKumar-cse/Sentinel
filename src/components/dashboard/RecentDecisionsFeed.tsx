"use client";

import { Badge } from "@/components/ui/badge";
import { BrainCircuit, SearchCode, Hammer, FileCheck, ShieldAlert } from "lucide-react";

const decisions = [
  { agent: "Orchestrator", action: "Invoked Healer agent for step retry", workflow: "P2P-1847", time: "2m ago", type: "orchestrator", icon: BrainCircuit },
  { agent: "Perceiver", action: "Extracted invoice data from vendor email", workflow: "P2P-1847", time: "5m ago", type: "perceiver", icon: SearchCode },
  { agent: "Executor", action: "Created employee record in Active Directory", workflow: "ONB-8821", time: "12m ago", type: "executor", icon: Hammer },
  { agent: "Verifier", action: "Matched goods receipt with PO #4410", workflow: "MEET-4410", time: "25m ago", type: "verifier", icon: FileCheck },
  { agent: "Healer", action: "Autonomously repaired broken budget API link", workflow: "P2P-1847", time: "1h ago", type: "healer", icon: ShieldAlert },
];

const agentColors: Record<string, string> = {
  orchestrator: "text-violet-500",
  perceiver: "text-sky-500",
  executor: "text-emerald-500",
  verifier: "text-amber-500",
  healer: "text-rose-500",
};

export function RecentDecisionsFeed() {
  return (
    <div className="space-y-1">
      {decisions.map((decision, i) => (
        <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-900/50 transition-colors border-b border-border/20 last:border-0">
          <div className={`mt-1 p-1.5 rounded-md bg-slate-900/50 ${agentColors[decision.type]}`}>
            <decision.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${agentColors[decision.type]}`}>{decision.agent}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{decision.time}</span>
            </div>
            <p className="text-sm font-medium text-foreground mt-0.5 truncate">{decision.action}</p>
            <p className="text-[10px] text-muted-foreground mt-1 font-mono">{decision.workflow}</p>
          </div>
        </div>
      ))}
    </div>
  );
}