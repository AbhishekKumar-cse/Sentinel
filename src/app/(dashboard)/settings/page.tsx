"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, BrainCircuit, Zap, Lock, Bell, Cpu } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>
        <p className="text-muted-foreground">Define autonomous policies and cognitive mesh parameters.</p>
      </div>

      <Tabs defaultValue="autonomous" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 p-1">
          <TabsTrigger value="autonomous">Autonomous Policy</TabsTrigger>
          <TabsTrigger value="mesh">Cognitive Mesh</TabsTrigger>
          <TabsTrigger value="security">Security & Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="autonomous" className="mt-6 space-y-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Financial Thresholds</CardTitle>
              <CardDescription>Define limits for automated decision making without human approval.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Max Automated Purchase</Label>
                  <p className="text-xs text-muted-foreground">Individual POs above this will trigger human review.</p>
                </div>
                <div className="w-32">
                  <Input type="number" defaultValue="10000" className="bg-slate-900/50" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Budget Variance Tolerance</Label>
                  <p className="text-xs text-muted-foreground">Percentage of budget variance allowed for auto-approval.</p>
                </div>
                <div className="w-32">
                  <Input type="number" defaultValue="5" className="bg-slate-900/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Healing Strategies</CardTitle>
              <CardDescription>Configure the Healer agent's recovery protocols.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-primary" /> Autonomous Repair</Label>
                  <p className="text-xs text-muted-foreground">Allow Healer to modify parameters and retry failed steps.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Max Retry Attempts</Label>
                  <p className="text-xs text-muted-foreground">Limit total self-healing cycles per workflow step.</p>
                </div>
                <div className="w-32">
                  <Input type="number" defaultValue="3" className="bg-slate-900/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mesh" className="mt-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Cognitive Capacity</CardTitle>
              <CardDescription>Manage agent fleet allocation and scaling.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2"><Cpu className="h-4 w-4 text-violet-500" /> Dynamic Scaling</Label>
                  <p className="text-xs text-muted-foreground">Automatically spin up more agent nodes during high cognitive load.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Max Parallel Workflows</Label>
                  <p className="text-xs text-muted-foreground">Total workflows processed by the mesh simultaneously.</p>
                </div>
                <div className="w-32">
                  <Input type="number" defaultValue="100" className="bg-slate-900/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Immutable Logging</CardTitle>
              <CardDescription>Security policies for the cryptographic audit trail.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2"><Lock className="h-4 w-4 text-emerald-500" /> Tamper-Proof Spine</Label>
                  <p className="text-xs text-muted-foreground">Enable cryptographic chaining for all audit entries.</p>
                </div>
                <Switch defaultChecked disabled />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audit Retention Policy</Label>
                  <p className="text-xs text-muted-foreground">How long to store full cryptographic proofs (in years).</p>
                </div>
                <div className="w-32">
                  <Input type="number" defaultValue="7" className="bg-slate-900/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 pt-8 border-t border-border/20">
        <Button variant="ghost">Discard Changes</Button>
        <Button className="bg-primary hover:bg-primary/90">Save Configuration</Button>
      </div>
    </div>
  );
}