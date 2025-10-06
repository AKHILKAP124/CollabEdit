import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  GitBranch,
  Plus,
  Search,
  Star,
  GitFork,
  Calendar,
  Globe,
  Lock,
  MoreHorizontal,
  Filter
} from "lucide-react";

const repositories = [
  {
    id: 1,
    name: "react-dashboard",
    description: "Modern React dashboard with TypeScript and Tailwind",
    language: "TypeScript",
    stars: 24,
    forks: 8,
    lastUpdated: "2 hours ago",
    isPublic: true,
    owner: "john-doe"
  },
  {
    id: 2,
    name: "vue-components",
    description: "Reusable Vue.js component library",
    language: "JavaScript",
    stars: 12,
    forks: 3,
    lastUpdated: "1 day ago",
    isPublic: false,
    owner: "john-doe"
  },
  {
    id: 3,
    name: "api-gateway",
    description: "Microservices API gateway with Node.js",
    language: "JavaScript",
    stars: 45,
    forks: 15,
    lastUpdated: "3 days ago",
    isPublic: true,
    owner: "john-doe"
  },
  {
    id: 4,
    name: "mobile-app",
    description: "Cross-platform mobile application",
    language: "TypeScript",
    stars: 8,
    forks: 2,
    lastUpdated: "1 week ago",
    isPublic: false,
    owner: "john-doe"
  },
];

const Repositories = () => {
  const [filter, setFilter] = useState("all");

  const filteredRepos = repositories.filter(repo => {
    if (filter === "public") return repo.isPublic;
    if (filter === "private") return !repo.isPublic;
    return true;
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      console.log("File Name:", file.name);
      console.log("Relative Path:", (file as any).webkitRelativePath);

      // Read file contents
      const text = await file.text(); // if it's a text-based file
      console.log("Content:", text);

      // If it's binary (e.g., image/pdf)
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Binary/URL Data:", reader.result);
      };
      reader.readAsDataURL(file); // base64 string
    }
  };


  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Repositories</h1>
            <p className="text-muted-foreground">Manage your code repositories and collaborate with others</p>
          </div>
          <Button
            className="bg-gradient-brand text-white"
            onClick={() => {
              const event = new CustomEvent('openCreateModal', { detail: { type: 'project' } });
              window.dispatchEvent(event);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Repository
          </Button>
          <input type="file" name="file" id="file" onChange={handleChange} className="hidde" {...{ webkitdirectory: "true", directory: "true" }} />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search repositories..." className="pl-10" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Repos</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{repositories.length}</p>
                  <p className="text-sm text-muted-foreground">Total Repositories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{repositories.filter(r => r.isPublic).length}</p>
                  <p className="text-sm text-muted-foreground">Public</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{repositories.filter(r => !r.isPublic).length}</p>
                  <p className="text-sm text-muted-foreground">Private</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{repositories.reduce((acc, r) => acc + r.stars, 0)}</p>
                  <p className="text-sm text-muted-foreground">Total Stars</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Repositories List */}
        <div className="space-y-4">
          {filteredRepos.map((repo, index) => (
            <Card
              key={repo.id}
              className="group hover:shadow-lg transition-all cursor-pointer animate-slide-up bg-gradient-surface"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-blue rounded-lg flex items-center justify-center">
                      <GitBranch className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg hover:text-primary cursor-pointer">
                          {repo.name}
                        </CardTitle>
                        <Badge variant={repo.isPublic ? "default" : "secondary"} className="text-xs">
                          {repo.isPublic ? (
                            <>
                              <Globe className="w-3 h-3 mr-1" />
                              Public
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 mr-1" />
                              Private
                            </>
                          )}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">{repo.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      {repo.language}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {repo.lastUpdated}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Clone
                    </Button>
                    <Button size="sm">
                      Open
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Repositories;