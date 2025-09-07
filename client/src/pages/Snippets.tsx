import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Code2, 
  Plus, 
  Search,
  Heart,
  Download,
  Calendar,
  Share2,
  MoreHorizontal,
  Package,
  Copy,
  Star
} from "lucide-react";

const snippets = [
  { 
    id: 1, 
    name: "useLocalStorage Hook", 
    description: "Custom React hook for managing localStorage with TypeScript support",
    language: "TypeScript", 
    likes: 156,
    downloads: 1200,
    date: "2 days ago", 
    owner: "sarah-dev",
    ownerAvatar: "/api/placeholder/32/32",
    image: "/api/placeholder/400/200",
    category: "hooks"
  },
  { 
    id: 2, 
    name: "Animated Button Component", 
    description: "Beautiful animated button with hover effects and loading states",
    language: "React", 
    likes: 89,
    downloads: 640,
    date: "1 week ago", 
    owner: "alex-ui",
    ownerAvatar: "/api/placeholder/32/32",
    image: "/api/placeholder/400/200",
    category: "components"
  },
  { 
    id: 3, 
    name: "API Fetch Utility", 
    description: "Type-safe API fetch utility with error handling and retry logic",
    language: "JavaScript", 
    likes: 234,
    downloads: 890,
    date: "3 days ago", 
    owner: "mike-tools",
    ownerAvatar: "/api/placeholder/32/32",
    image: "/api/placeholder/400/200",
    category: "utils"
  },
  { 
    id: 4, 
    name: "Modal Component", 
    description: "Accessible modal component with focus management and animations",
    language: "React", 
    likes: 112,
    downloads: 520,
    date: "5 days ago", 
    owner: "emma-comp",
    ownerAvatar: "/api/placeholder/32/32",
    image: "/api/placeholder/400/200",
    category: "components"
  },
];

const components = [
  { 
    id: 1, 
    name: "Dashboard Sidebar", 
    description: "Responsive sidebar component with navigation and theming support",
    language: "React", 
    likes: 78,
    downloads: 340,
    date: "1 day ago", 
    owner: "john-doe",
    ownerAvatar: "/api/placeholder/32/32",
    image: "/api/placeholder/400/200",
    category: "layout"
  },
  { 
    id: 2, 
    name: "Data Table", 
    description: "Advanced data table with sorting, filtering, and pagination",
    language: "TypeScript", 
    likes: 203,
    downloads: 1150,
    date: "4 days ago", 
    owner: "data-master",
    ownerAvatar: "/api/placeholder/32/32",
    image: "/api/placeholder/400/200",
    category: "table"
  },
];

const Snippets = () => {
  const [activeTab, setActiveTab] = useState("snippets");
  
  const renderItems = (items: typeof snippets) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <Card 
          key={item.id} 
          className="group hover:shadow-lg transition-all cursor-pointer animate-slide-up bg-gradient-surface" 
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="mt-1">{item.description}</CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {item.language}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {item.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {item.downloads}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {item.date}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={item.ownerAvatar} />
                  <AvatarFallback className="text-xs">
                    {item.owner.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{item.owner}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm">
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Snippets & Components</h1>
            <p className="text-muted-foreground">Discover, share, and reuse code snippets and UI components</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Contribute
            </Button>
            <Button className="bg-gradient-brand text-white">
              <Package className="w-4 h-4 mr-2" />
              My Library
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search snippets and components..." className="pl-10" />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Code2 className="w-4 h-4" />
              {snippets.length} Snippets
            </div>
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              {components.length} Components
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{snippets.length + components.length}</p>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {[...snippets, ...components].reduce((acc, item) => acc + item.likes, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {[...snippets, ...components].reduce((acc, item) => acc + item.downloads, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">My Contributions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="snippets" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Code Snippets
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              UI Components
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="snippets" className="mt-6">
            {renderItems(snippets)}
          </TabsContent>
          
          <TabsContent value="components" className="mt-6">
            {renderItems(components)}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Snippets;