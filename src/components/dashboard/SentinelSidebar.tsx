"use client";

import { 
  LayoutDashboard, 
  Workflow, 
  Bot, 
  ShieldCheck, 
  BarChart3, 
  Settings, 
  PlusCircle,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Command Center", url: "/dashboard", icon: LayoutDashboard },
  { title: "Active Workflows", url: "/dashboard/workflows", icon: Workflow },
  { title: "Agent Fleet", url: "/dashboard/agents", icon: Bot },
];

const analyticItems = [
  { title: "Immutable Audit Log", url: "/dashboard/audit", icon: ShieldCheck },
  { title: "SLA Analytics", url: "/dashboard/analytics", icon: BarChart3 },
];

export function SentinelSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r border-border/50">
      <SidebarHeader className="h-14 flex items-center px-4 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter group-data-[collapsible=icon]:hidden">
            SENTINEL
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg" className="bg-primary/10 text-primary hover:bg-primary/20">
                <Link href="/dashboard/workflows/new">
                  <PlusCircle className="h-5 w-5" />
                  <span>Launch Workflow</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Main Operations</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.url}
                  tooltip={item.title}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Intelligence & Audit</SidebarGroupLabel>
          <SidebarMenu>
            {analyticItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.url}
                  tooltip={item.title}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="System Settings">
              <Link href="/dashboard/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}