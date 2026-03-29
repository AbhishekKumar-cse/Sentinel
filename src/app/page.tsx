"use client";

import { useRouter } from "next/navigation";
import { Cpu, Zap, ShieldCheck, BrainCircuit, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-border/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Cpu className="h-6 w-6" />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tighter text-foreground">SENTINEL</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>Documentation</Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold" onClick={() => router.push("/dashboard")}>
            Launch Platform
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-border/50 text-xs font-mono font-bold tracking-widest text-primary uppercase animate-in fade-in slide-in-from-top-4 duration-1000">
            <Zap className="h-3 w-3" /> Cognition-First Enterprise Orchestration
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Autonomous Workflows That <span className="text-primary italic">Self-Heal.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            SENTINEL uses a cognitive mesh of AI agents to perceive, plan, act, and verify across your enterprise—leaving an immutable audit trail.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 group" onClick={() => router.push("/dashboard")}>
              Get Started <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-2" onClick={() => router.push("/dashboard")}>
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-32 px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
          {[
            { title: "Cognitive Mesh", desc: "Cooperative agents specializing in perception, action, and verification.", icon: BrainCircuit },
            { title: "Self-Healing Immune System", desc: "Automated failure diagnosis and recovery strategies prevent SLA breaches.", icon: Zap },
            { title: "Immutable Audit Spine", desc: "Cryptographically chained record of every autonomous decision.", icon: ShieldCheck }
          ].map((feature, i) => (
            <Card key={i} className="bg-slate-900/40 border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono uppercase tracking-widest">
        <p>&copy; 2024 SENTINEL Platform. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Security</a>
          <a href="#" className="hover:text-primary transition-colors">API</a>
          <a href="#" className="hover:text-primary transition-colors">Status</a>
        </div>
      </footer>
    </div>
  );
}