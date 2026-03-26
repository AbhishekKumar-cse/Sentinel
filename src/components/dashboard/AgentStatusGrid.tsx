"use client";

import { Badge } from "@/components/ui/badge";
import { BrainCircuit, SearchCode, Hammer, FileCheck, ShieldAlert, Zap } from "lucide-react";

const agents = [
  { name: "Orchestrator", type: "orchestrator", status: "Idle", health: 98, icon: BrainCircuit, color: "text-violet-500", bg: "bg-violet-500/10" },
  { name: "Perceiver", type: "perceiver", status: "Working", health: 94, icon: SearchCode, color: "text-sky-500", bg: "bg-sky-500/10" },
  { name: "Executor", type: "executor", status: "Working", health: 96, icon: Hammer, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Verifier", type: "verifier", status: "Idle", health: 99, icon: FileCheck, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Healer", type: "healer", status: "Idle", health: 100, icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-500/10" },
  { name: "Meeting AI", type: "meeting", status: "Offline", health: 0, icon: Zap, color: "text-slate-500", bg: "bg-slate-500/10" },
];

export function AgentStatusGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <div key={agent.type} className="flex flex-col p-4 rounded-xl border border-border/50 bg-card/40 hover:bg-card/60 transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${agent.bg} ${agent.color}`}>
              <agent.icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-end">
              <Badge variant={agent.status === "Working" ? "secondary" : "outline"} className={agent.status === "Working" ? "bg-primary/20 text-primary border-primary/30" : ""}>
                {agent.status === "Working" && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mr-1.5" />}
                {agent.status}
              </Badge>
              <span className="text-[10px] text-muted-foreground mt-1 tabular-nums">Health: {agent.health}%</span>
            </div>
          </div>
          <h3 className="font-bold text-sm">{agent.name} Agent</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {agent.status === "Working" ? "Processing cognitive workflow branch..." : "Standing by for new instructions."}
          </p>
        </div>
      ))}
    </div>
  );
}