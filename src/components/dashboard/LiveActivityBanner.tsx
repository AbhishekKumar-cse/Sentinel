"use client";

import { Badge } from "@/components/ui/badge";
import { Zap, Activity, AlertCircle } from "lucide-react";

export function LiveActivityBanner() {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1.5 font-medium tabular-nums">
          <Activity className="h-3 w-3 animate-pulse" />
          4 Active Agents
        </Badge>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 gap-1.5 font-medium tabular-nums">
          <Zap className="h-3 w-3" />
          12 Running Workflows
        </Badge>
        <Badge variant="destructive" className="bg-rose-500/10 text-rose-500 border-rose-500/20 gap-1.5 font-medium tabular-nums animate-pulse">
          <AlertCircle className="h-3 w-3" />
          2 SLA At Risk
        </Badge>
      </div>
      <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
        JD
      </div>
    </div>
  );
}