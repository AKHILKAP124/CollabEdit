import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Code2, 
  Plus, 
  Search,
  Users,
  Calendar,
  Share2,
  MoreHorizontal
} from "lucide-react";

const playgrounds = [
  { 
    id: 1, 
    name: "React Dashboard", 
    description: "Modern dashboard with React and Tailwind",
    language: "TypeScript", 
    lastModified: "2 hours ago", 
    collaborators: 3,
    isPublic: false
  },
  { 
    id: 2, 
    name: "Next.js API Routes", 
    description: "RESTful API with authentication",
    language: "JavaScript", 
    lastModified: "1 day ago", 
    collaborators: 1,
    isPublic: true
  },
  { 
    id: 3, 
    name: "Tailwind Components", 
    description: "Reusable UI component library",
    language: "HTML", 
    lastModified: "3 days ago", 
    collaborators: 5,
    isPublic: true
  },
  { 
    id: 4, 
    name: "Vue.js SPA", 
    description: "Single page application with Vue 3",
    language: "JavaScript", 
    lastModified: "1 week ago", 
    collaborators: 2,
    isPublic: false
  },
];

const Playgrounds = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Playgrounds</h1>
            <p className="text-muted-foreground">Create and manage your code playgrounds</p>
          </div>
          <Button 
            className="bg-gradient-brand text-white"
            onClick={() => {
              const event = new CustomEvent('openCreateModal', { detail: { type: 'playground' } });
              window.dispatchEvent(event);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Playground
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search playgrounds..." className="pl-10" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        {/* Playgrounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playgrounds.map((playground, index) => (
            <Card 
              key={playground.id} 
              className="group hover:shadow-lg transition-all cursor-pointer animate-slide-up bg-gradient-surface" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-blue rounded-lg flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg">{playground.name}</CardTitle>
                <CardDescription>{playground.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {playground.language}
                  </Badge>
                  <Badge variant={playground.isPublic ? "default" : "outline"} className="text-xs">
                    {playground.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {playground.lastModified}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {playground.collaborators}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Open
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Playgrounds;