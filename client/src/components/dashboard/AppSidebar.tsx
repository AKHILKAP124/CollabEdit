import { 
  Home, 
  Code2, 
  GitBranch, 
  Layers, 
  Sparkles, 
  Activity,
  Plus,
  Lock
  , Blocks
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Playgrounds", url: "/playgrounds", icon: Code2 },
  { title: "Repositories", url: "/repositories", icon: GitBranch },
  { title: "Snippets & Components", url: "/snippets", icon: Layers },
  { title: "AI Website Generator", url: "/ai-generator", icon: Sparkles, locked: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-accent text-accent-foreground font-medium border-l-2 border-primary" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} variant="sidebar">
      <SidebarContent className="bg-gradient-surface border-r">
        {/* Logo Section */}
        <div className="p-6 border-b">
          <div onClick={() => navigate("/dashboard")} className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
              <Blocks className="w-6 h-6 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg">CollabEdit</h1>
                <p className="text-xs text-muted-foreground">Collaborative Code Editor</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="p-4">
            <Button 
              className="w-full bg-gradient-brand hover:opacity-90 text-white"
              onClick={() => {
                // This will be handled by the parent component
                const event = new CustomEvent('openCreateModal', { detail: { type: 'playground' } });
                window.dispatchEvent(event);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Playground
            </Button>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName({ isActive: isActive(item.url) })}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && (
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.locked && <Lock className="w-3 h-3 text-muted-foreground" />}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-purple rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Free Plan</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}