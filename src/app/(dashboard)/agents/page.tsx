"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BrainCircuit, 
  SearchCode, 
  Hammer, 
  FileCheck, 
  ShieldAlert, 
  Zap,
  Activity,
  ArrowUpRight,
  Settings2,
  Cpu
} from "lucide-react";

const agents = [
  { name: "Orchestrator", type: "orchestrator", status: "Idle", health: 98, cognitiveLoad: 12, uptime: "14d 2h", icon: BrainCircuit, color: "text-violet-500", bg: "bg-violet-500/10" },
  { name: "Perceiver", type: "perceiver", status: "Working", health: 94, cognitiveLoad: 68, uptime: "14d 2h", icon: SearchCode, color: "text-sky-500", bg: "bg-sky-500/10" },
  { name: "Executor", type: "executor", status: "Working", health: 96, cognitiveLoad: 45, uptime: "14d 2h", icon: Hammer, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Verifier", type: "verifier", status: "Idle", health: 99, cognitiveLoad: 8, uptime: "14d 2h", icon: FileCheck, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Healer", type: "healer", status: "Idle", health: 100, cognitiveLoad: 2, uptime: "14d 2h", icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-500/10" },
  { name: "Meeting AI", type: "meeting", status: "Offline", health: 0, cognitiveLoad: 0, uptime: "0d", icon: Zap, color: "text-slate-500", bg: "bg-slate-500/10" },
];

export default function AgentsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Fleet Registry</h1>
          <p className="text-muted-foreground">Manage specialized cognitive units and their operational health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" /> Global Diagnostics
          </Button>
          <Button variant="outline" size="sm">
            <Settings2 className="mr-2 h-4 w-4" /> Fleet Policy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.type} className="bg-card/40 border-border/50 hover:border-primary/50 transition-all overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${agent.bg} ${agent.color}`}>
                  <agent.icon className="h-6 w-6" />
                </div>
                <Badge variant={agent.status === "Working" ? "secondary" : "outline"} className={agent.status === "Working" ? "bg-primary/20 text-primary border-primary/30" : ""}>
                  {agent.status}
                </Badge>
              </div>
              <div className="mt-4">
                <CardTitle className="text-lg font-bold">{agent.name} Agent</CardTitle>
                <CardDescription className="text-xs uppercase font-mono tracking-widest mt-1">UUID: {agent.type}-mesh-01</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-slate-950/50 border border-border/30">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Health Score</p>
                  <p className={`text-lg font-bold tabular-nums ${agent.health > 90 ? "text-emerald-500" : agent.health > 0 ? "text-amber-500" : "text-rose-500"}`}>{agent.health}%</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/50 border border-border/30">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Total Uptime</p>
                  <p className="text-lg font-bold tabular-nums text-foreground">{agent.uptime}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>Cognitive Load</span>
                  <span>{agent.cognitiveLoad}%</span>
                </div>
                <Progress value={agent.cognitiveLoad} className="h-1.5" />
              </div>

              <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                <span className="text-xs text-muted-foreground italic">
                  {agent.status === "Working" ? "Executing task: Analysis_Ref_441..." : "Awaiting cognitive pulse..."}
                </span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
            <Cpu className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Mesh Cognitive Capacity: 92.4% Available</h3>
            <p className="text-sm text-muted-foreground">The SENTINEL mesh is performing at peak efficiency. No agent bottlenecks detected.</p>
          </div>
          <Button variant="default">Scale Cognitive Nodes</Button>
        </CardContent>
      </Card>
    </div>
  );
}