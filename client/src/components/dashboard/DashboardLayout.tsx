import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { CreateProjectModal } from "../modals/CreateProjectModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<"playground" | "project">("playground");

  useEffect(() => {
    const handleOpenCreateModal = (event: CustomEvent) => {
      setCreateModalType(event.detail.type);
      setCreateModalOpen(true);
    };

    window.addEventListener('openCreateModal', handleOpenCreateModal as EventListener);
    return () => window.removeEventListener('openCreateModal', handleOpenCreateModal as EventListener);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
      <CreateProjectModal 
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        type={createModalType}
      />
    </SidebarProvider>
  );
}