"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Bot, 
  Users, 
  BrainCircuit, 
  PlusCircle,
  Clock,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { collection, query, orderBy } from "firebase/firestore";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";

export default function WorkflowsPage() {
  const firestore = useFirestore();
  const workflowsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "workflows"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: workflows, isLoading } = useCollection(workflowsQuery);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Workflows</h1>
          <p className="text-muted-foreground">Monitor and manage your autonomous enterprise processes.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/workflows/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Launch Workflow
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/40 border-border/50">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Active Runs</p>
              <p className="text-2xl font-bold">{workflows?.filter(w => w.status !== 'completed').length || 0}</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Bot className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-border/50">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">SLA at Risk</p>
              <p className="text-2xl font-bold text-rose-500">{workflows?.filter(w => w.slaStatus === 'at_risk').length || 0}</p>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-border/50">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Completed</p>
              <p className="text-2xl font-bold text-emerald-500">{workflows?.filter(w => w.status === 'completed').length || 0}</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/40 border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 bg-slate-900/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 bg-slate-950/50 border-border/50" placeholder="Search workflow name or ID..." />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/30 text-[10px] uppercase tracking-widest text-muted-foreground font-bold border-b border-border/50">
                <th className="px-6 py-4">Workflow</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">SLA</th>
                <th className="px-6 py-4">Started</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic">Fetching workflow telemetry...</td>
                </tr>
              ) : workflows && workflows.length > 0 ? (
                workflows.map((wf) => (
                  <tr key={wf.id} className="group hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {wf.type === "procurement" ? <Bot className="h-4 w-4" /> : wf.type === "onboarding" ? <Users className="h-4 w-4" /> : <BrainCircuit className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold font-mono">{wf.id}</p>
                          <p className="text-xs text-muted-foreground">{wf.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={wf.status === "awaiting_human" ? "destructive" : wf.status === "completed" ? "secondary" : "outline"} className={wf.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""}>
                        <span className="capitalize">{wf.status.replace('_', ' ')}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4 min-w-[140px]">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                          <span>{wf.totalSteps > 0 ? Math.round((wf.completedSteps / wf.totalSteps) * 100) : 0}%</span>
                        </div>
                        <Progress value={wf.totalSteps > 0 ? (wf.completedSteps / wf.totalSteps) * 100 : 0} className="h-1" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={wf.slaStatus === "at_risk" ? "destructive" : "outline"} className="capitalize">
                        {wf.slaStatus.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                        <Clock className="h-3 w-3" /> {new Date(wf.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic">No workflows registered in the mesh.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
