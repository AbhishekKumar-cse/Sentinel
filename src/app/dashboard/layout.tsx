import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SentinelSidebar } from "@/components/dashboard/SentinelSidebar";
import { LiveActivityBanner } from "@/components/dashboard/LiveActivityBanner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        <SentinelSidebar />
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-4 border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
              <div className="h-4 w-px bg-border" />
              <h1 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground">Sentinel Command Center</h1>
            </div>
            <LiveActivityBanner />
          </header>
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
