import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  GitBranch,
  Layers,
  Plus,
  TrendingUp,
  Clock,
  Users,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/slices/UserSlice";

const recentPlaygrounds = [
  { id: 1, name: "React Dashboard", language: "TypeScript", lastModified: "2 hours ago", collaborators: 3 },
  { id: 2, name: "Next.js API Routes", language: "JavaScript", lastModified: "1 day ago", collaborators: 1 },
  { id: 3, name: "Tailwind Components", language: "HTML", lastModified: "3 days ago", collaborators: 5 },
];

const stats = [
  { title: "Total Playgrounds", value: "12", icon: Code2, trend: "+3 this week" },
  { title: "Repositories", value: "8", icon: GitBranch, trend: "+1 this week" },
  { title: "Snippets", value: "24", icon: Layers, trend: "+8 this week" },
  { title: "Collaborators", value: "15", icon: Users, trend: "+2 this week" },
];

export function DashboardOverview() {
  const navigate = useNavigate();
  const userDetails = useSelector((state: { userReducer: UserState }) => state.userReducer.user);
  console.log("User Details:", userDetails);
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-brand text-white rounded-xl p-8 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userDetails?.fullname}</h1>
            <p className="text-white/80 text-lg">Ready to build something amazing today?</p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="bg-gradient-surface hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Playgrounds */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Playgrounds
            </CardTitle>
            <CardDescription>Your most recently modified projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPlaygrounds.map((playground) => (
              <div key={playground.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-blue rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{playground.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {playground.language}
                      </Badge>
                      <span>•</span>
                      <span>{playground.lastModified}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {playground.collaborators}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => navigate('/playgrounds')}>
              View All Playgrounds
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-brand text-white"
              onClick={() => {
                // This will be handled by the parent component
                const event = new CustomEvent('openCreateModal', { detail: { type: 'playground' } });
                window.dispatchEvent(event);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Playground
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <GitBranch className="w-4 h-4 mr-2" />
              New Repository
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/snippets')}>
              <Layers className="w-4 h-4 mr-2" />
              Browse Snippets
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Star className="w-4 h-4 mr-2" />
              Explore Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}