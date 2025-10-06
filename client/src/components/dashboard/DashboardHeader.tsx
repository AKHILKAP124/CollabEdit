import { Bell, Search} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToogle from "@/components/ui/ThemeToogle";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

export function DashboardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlelogout = async () => {

    try {
     await api.post('/auth/logout')
      .then((response) => {
        if (response?.data?.success) {
          dispatch(logout());
          navigate('/');
          localStorage.removeItem("accessToken");
          toast({
            title: "Logged out",
            description: ("You have been logged out successfully."),
          })
        }
      })
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "Logout failed. Please try again.",
        variant: "destructive",
      })
      return;
    }
    
  }
  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 gap-4">
      <SidebarTrigger />
      
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search playgrounds, repos, snippets..." 
            className="pl-10 bg-background/50"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 justify-end md:flex-1 max-w-md md:max-w-none">
        {/* Theme Toggle */}
        <ThemeToogle />

        {/* Notifications */}
        <Button variant="ghost" size="sm">
          <Bell className="w-4 h-4" />
        </Button>

        {/* Profile Avatar */}
        <div onClick={handlelogout} className="w-8 h-8 bg-gradient-purple rounded-full flex items-center justify-center cursor-pointer">
          <span className="text-xs font-semibold text-white">JD</span>
        </div>
      </div>
    </header>
  );
}