"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Clock, ShieldCheck, Zap, TrendingUp } from "lucide-react";

const slaData = [
  { name: "Mon", compliant: 98, risk: 2 },
  { name: "Tue", compliant: 99, risk: 1 },
  { name: "Wed", compliant: 94, risk: 6 },
  { name: "Thu", compliant: 97, risk: 3 },
  { name: "Fri", compliant: 98, risk: 2 },
  { name: "Sat", compliant: 100, risk: 0 },
  { name: "Sun", compliant: 100, risk: 0 },
];

const durationData = [
  { time: "00:00", duration: 12 },
  { time: "04:00", duration: 15 },
  { time: "08:00", duration: 45 },
  { time: "12:00", duration: 120 },
  { time: "16:00", duration: 180 },
  { time: "20:00", duration: 90 },
  { time: "23:59", duration: 30 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SLA Intelligence</h1>
          <p className="text-muted-foreground">Historical performance and predictive risk analysis.</p>
        </div>
        <Badge variant="outline" className="py-1 px-4 text-emerald-500 border-emerald-500/20 bg-emerald-500/5">
          <ShieldCheck className="mr-2 h-4 w-4" /> Enterprise Compliance: 98.4%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Autonomous Actions", value: "24,812", icon: Zap, trend: "+12%" },
          { label: "Avg Execution Time", value: "2h 15m", icon: Clock, trend: "-5%" },
          { label: "Self-Healing Success", value: "94.2%", icon: BrainCircuit, trend: "+2%" },
          { label: "Manual Interventions", value: "12", icon: TrendingUp, trend: "-18%" },
        ].map((stat, i) => (
          <Card key={stat.label} className="bg-card/40 border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-primary'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/40 border-border/50">
          <CardHeader>
            <CardTitle>SLA Compliance Distribution</CardTitle>
            <CardDescription>Daily compliance vs risk across the workflow fleet.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={slaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="compliant" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="risk" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/50">
          <CardHeader>
            <CardTitle>Workflow Duration Trends</CardTitle>
            <CardDescription>Average minutes to completion throughout the day.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={durationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}m`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="duration" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
