"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Search, Download, RefreshCw, Link2, Lock, History, User } from "lucide-react";

const auditEntries = [
  { seq: 247, hash: "8f2a1c9e3b4d", prevHash: "a1b2c3d4e5f6", timestamp: "2024-05-15 14:30:01", agent: "Executor", action: "EXECUTED: Generated PO #1847", details: "PO generated via standard enterprise template v2.1. PDF stored in encrypted bucket.", isHuman: false },
  { seq: 246, hash: "a1b2c3d4e5f6", prevHash: "f9e8d7c6b5a4", timestamp: "2024-05-15 14:28:15", agent: "Verifier", action: "VERIFIED: Budget approved for cost center 4402", details: "Budget verification passed. Matching 102% of requested amount against available funds.", isHuman: false },
  { seq: 245, hash: "f9e8d7c6b5a4", prevHash: "0d9c8b7a6f5e", timestamp: "2024-05-15 14:25:30", agent: "Human", action: "APPROVED: Strategic exception for vendor Acme", details: "Manual override approved by Finance Director Mark S.", isHuman: true },
  { seq: 244, hash: "0d9c8b7a6f5e", prevHash: "9a8b7c6d5e4f", timestamp: "2024-05-15 14:20:44", agent: "Healer", action: "REPAIRED: Resolved database transient lock", details: "Applied rollback-and-retry strategy. Step 2 successfully re-executed.", isHuman: false },
];

export default function AuditLogPage() {
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => setVerifying(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Immutable Audit Spine</h1>
          <p className="text-muted-foreground">Cryptographic trail of every autonomous decision and action.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleVerify} disabled={verifying}>
            <RefreshCw className={`mr-2 h-4 w-4 ${verifying ? "animate-spin" : ""}`} /> 
            {verifying ? "Verifying Chain..." : "Verify Integrity"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Trail
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-emerald-500/5 border-emerald-500/20 md:col-span-4">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-emerald-500">Audit chain integrity verified</p>
              <p className="text-xs text-muted-foreground">Last verified at {new Date().toLocaleTimeString()}. 2,481 entries confirmed healthy.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/40 border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 bg-slate-900/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 bg-slate-950/50" placeholder="Search hash, action, or workflow ID..." />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] bg-slate-950/50">
                <SelectValue placeholder="Agent Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="orchestrator">Orchestrator</SelectItem>
                <SelectItem value="executor">Executor</SelectItem>
                <SelectItem value="human">Human Action</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="divide-y divide-border/20">
          {auditEntries.map((entry, i) => (
            <div key={entry.seq} className="group relative flex flex-col md:flex-row gap-6 p-6 hover:bg-slate-900/30 transition-all">
              <div className="flex flex-row md:flex-col gap-4 md:w-48 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-primary">#{entry.seq}</span>
                  <Lock className="h-3 w-3 text-muted-foreground opacity-50" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Hash ID</p>
                  <p className="text-xs font-mono text-foreground truncate max-w-[120px]" title={entry.hash}>{entry.hash}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Timestamp</p>
                  <p className="text-xs text-muted-foreground font-mono">{entry.timestamp}</p>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={entry.isHuman ? "secondary" : "outline"} className={entry.isHuman ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : ""}>
                      {entry.isHuman ? <User className="mr-1 h-3 w-3" /> : <History className="mr-1 h-3 w-3" />}
                      {entry.agent}
                    </Badge>
                    <h3 className="font-bold text-lg">{entry.action}</h3>
                  </div>
                  <Link2 className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
                <div className="p-4 rounded-xl bg-slate-950/50 border border-border/30">
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &ldquo;{entry.details}&rdquo;
                  </p>
                </div>
              </div>

              {/* Chain visualizer line (only for md and up) */}
              <div className="hidden md:block absolute left-48 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-900/50 border-t border-border/50 text-center">
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs uppercase tracking-widest">
            Load Historical Chain Data
          </Button>
        </div>
      </Card>
    </div>
  );
}
