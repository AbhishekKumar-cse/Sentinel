"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  Clock, 
  ShieldAlert,
  BrainCircuit,
  Zap,
  Bot,
  Users
} from "lucide-react";
import Link from "next/link";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { useFirestore, useCollection, useMemoFirebase, useAuth } from "@/firebase";
import { signInAnonymously } from "firebase/auth";
import { SLAGaugeChart } from "@/components/dashboard/SLAGaugeChart";
import { AgentStatusGrid } from "@/components/dashboard/AgentStatusGrid";
import { RecentDecisionsFeed } from "@/components/dashboard/RecentDecisionsFeed";

export default function CommandCenter() {
  const { auth, firestore } = useFirestore() ? { auth: useAuth(), firestore: useFirestore() } : { auth: null, firestore: null };

  // Auto-login for prototype access
  useEffect(() => {
    if (auth && !auth.currentUser) {
      signInAnonymously(auth);
    }
  }, [auth]);

  const workflowsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "workflows"), orderBy("createdAt", "desc"), limit(5));
  }, [firestore]);

  const { data: workflows, isLoading } = useCollection(workflowsQuery);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "SLA Compliance", value: "98.4%", icon: ShieldAlert, trend: "+1.2%", color: "text-emerald-500" },
          { label: "Avg Duration", value: "2h 15m", icon: Clock, trend: "-12m", color: "text-primary" },
          { label: "Autonomous Rate", value: "94.2%", icon: BrainCircuit, trend: "+3.1%", color: "text-violet-500" },
          { label: "Systems Active", value: "100%", icon: Zap, trend: "Stable", color: "text-amber-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-slate-900/50 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold tabular-nums tracking-tight">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Agent Fleet Registry</h2>
              <p className="text-sm text-muted-foreground">Real-time health and cognitive load of specialized agents.</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/agents">View All Agents <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <AgentStatusGrid />

          <Card className="bg-card/40 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-bold">Priority Workflows</CardTitle>
                <CardDescription>Mission-critical autonomous processes currently in flight.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/workflows">See All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {isLoading ? (
                  <p className="text-sm text-muted-foreground animate-pulse text-center py-8">Syncing with SENTINEL node...</p>
                ) : workflows && workflows.length > 0 ? (
                  workflows.map((workflow, i) => (
                    <div key={workflow.id} className="group relative flex flex-col gap-3 p-4 rounded-xl bg-slate-900/30 border border-transparent hover:border-border/50 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {workflow.type === "procurement" ? <Bot /> : workflow.type === "onboarding" ? <Users /> : <BrainCircuit />}
                          </div>
                          <div>
                            <p className="text-sm font-bold font-mono">{workflow.id}</p>
                            <p className="text-xs text-muted-foreground capitalize">{workflow.type} Workflow</p>
                          </div>
                        </div>
                        <Badge variant={workflow.slaStatus === "at_risk" ? "destructive" : "secondary"}>
                          {workflow.slaStatus === "on_track" ? "On Track" : workflow.slaStatus}
                        </Badge>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                          <span>Status: {workflow.status}</span>
                          <span>{workflow.totalSteps > 0 ? Math.round((workflow.completedSteps / workflow.totalSteps) * 100) : 0}%</span>
                        </div>
                        <Progress value={workflow.totalSteps > 0 ? (workflow.completedSteps / workflow.totalSteps) * 100 : 0} className="h-1.5" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border border-dashed rounded-xl border-border/50">
                    <p className="text-sm text-muted-foreground">No active workflows found in the cognitive mesh.</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link href="/dashboard/workflows/new">Launch your first workflow</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-bold">SLA Compliance</CardTitle>
              <CardDescription>30-day enterprise performance index.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pb-8">
              <SLAGaugeChart />
              <div className="text-center mt-4">
                <p className="text-3xl font-bold tabular-nums">98.4%</p>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Cognitive Decisions</CardTitle>
              <CardDescription>Live feed of autonomous agent reasoning.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <RecentDecisionsFeed />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
