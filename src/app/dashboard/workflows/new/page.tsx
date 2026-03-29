"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, BrainCircuit, ArrowRight, ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type WorkflowType = "procurement" | "onboarding" | "meeting";

export default function NewWorkflowPage() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<WorkflowType>("procurement");
  const router = useRouter();
  const { toast } = useToast();

  const handleLaunch = () => {
    toast({
      title: "Workflow Initialized",
      description: "SENTINEL has started the orchestration flow.",
    });
    router.push("/dashboard/workflows");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Launch Workflow Intelligence</h1>
        <p className="text-muted-foreground">Select an autonomous process to trigger the cognitive mesh.</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step === s ? "bg-primary text-primary-foreground" : 
              step > s ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-500"
            }`}>
              {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
            </div>
            {s < 3 && <div className="w-12 h-0.5 bg-slate-800" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: "procurement", label: "Procurement-to-Payment", icon: Bot, desc: "End-to-end P2P with automated three-way matching.", sla: "72h" },
            { id: "onboarding", label: "Employee Onboarding", icon: Users, desc: "Complete IT provisioning and HR setup orchestration.", sla: "5d" },
            { id: "meeting", label: "Meeting Intelligence", icon: BrainCircuit, desc: "Action item extraction and deadline monitoring.", sla: "30m" },
          ].map((item) => (
            <Card 
              key={item.id}
              className={`cursor-pointer transition-all border-2 ${type === item.id ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50"}`}
              onClick={() => setType(item.id as WorkflowType)}
            >
              <CardContent className="pt-6 text-center space-y-4">
                <div className={`mx-auto h-12 w-12 rounded-xl flex items-center justify-center ${type === item.id ? "bg-primary text-white" : "bg-slate-800 text-slate-400"}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">{item.label}</h3>
                  <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-widest">{item.sla} SLA</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {step === 2 && (
        <Card className="bg-card/40 border-border/50">
          <CardHeader>
            <CardTitle>Workflow Configuration</CardTitle>
            <CardDescription>Provide initial context for the perception agent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {type === "procurement" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Vendor Name</Label>
                  <Input placeholder="Acme Corp" className="bg-slate-900/50" />
                </div>
                <div className="space-y-2">
                  <Label>Budget Code</Label>
                  <Input placeholder="DEPT-OPEX-2024" className="bg-slate-900/50" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Justification</Label>
                  <Textarea placeholder="Explain why this procurement is required..." className="bg-slate-900/50 min-h-[100px]" />
                </div>
              </div>
            )}
            {type === "onboarding" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Employee Name</Label>
                  <Input placeholder="Jane Doe" className="bg-slate-900/50" />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" className="bg-slate-900/50" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-900/50">
                      <SelectValue placeholder="Select Dept" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eng">Engineering</SelectItem>
                      <SelectItem value="ops">Operations</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {type === "meeting" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Meeting Transcript</Label>
                  <Textarea placeholder="Paste raw meeting transcript here..." className="bg-slate-900/50 min-h-[200px]" />
                </div>
                <div className="space-y-2">
                  <Label>Reference Previous Meeting (Optional)</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-900/50">
                      <SelectValue placeholder="Select Meeting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prev-1">Strategic Planning Q3</SelectItem>
                      <SelectItem value="prev-2">Weekly Ops Sync #42</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-emerald-500 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              Intelligence Ready
            </CardTitle>
            <CardDescription>SENTINEL has verified all initial inputs. Orchestration can proceed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-border/50">
                <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest mb-1">Target SLA</p>
                <p className="font-bold text-lg">72 Hours</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-border/50">
                <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest mb-1">Agents Assigned</p>
                <p className="font-bold text-lg">5 Cognitive Units</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-xs leading-relaxed text-primary">
                <strong>Autonomous Policy:</strong> This workflow will execute without human oversight for all decisions under $10,000. Healer agents are authorized for 3 self-repair attempts per step.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center pt-8">
        <Button 
          variant="outline" 
          onClick={() => setStep(step - 1)} 
          disabled={step === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        {step < 3 ? (
          <Button 
            onClick={() => setStep(step + 1)}
            className="gap-2"
          >
            Next Step <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleLaunch}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Launch Autonomous Mesh <Zap className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
