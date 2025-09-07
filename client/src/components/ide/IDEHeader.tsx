import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Play, 
  Share2, 
  GitBranch, 
  GitCommit, 
  Code2,
  Users
} from 'lucide-react';
import { useParams } from 'react-router-dom';

export function IDEHeader() {

  const prams = useParams();


  const presenceUsers = [
    { id: 1, name: 'Alex', avatar: '', initials: 'AL', color: 'presence-1' },
    { id: 2, name: 'Sarah', avatar: '', initials: 'SR', color: 'presence-2' },
    { id: 3, name: 'Mike', avatar: '', initials: 'MK', color: 'presence-3' },
  ];

  return (
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shadow-soft">
      {/* Left - Logo & Project */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">{prams.id}</span>
        </div>
        
        <div className="h-4 w-px bg-border" />
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">react-todo-app</span>
          <Badge variant="secondary" className="text-xs">
            <GitBranch className="h-3 w-3 mr-1" />
            main
          </Badge>
        </div>

        {/* Branch Select */}
        <Select defaultValue="main">
          <SelectTrigger className="w-32 h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main">main</SelectItem>
            <SelectItem value="feature/auth">feature/auth</SelectItem>
            <SelectItem value="bugfix/api">bugfix/api</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Center - Actions */}
      <div className="flex items-center gap-2">
        <Button variant="default" size="sm" className="gap-2">
          <Play className="h-4 w-4" />
          Run
          <kbd className="text-xs opacity-60">⌘R</kbd>
        </Button>
        
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        
        <Button variant="outline" size="sm" className="gap-2">
          <GitCommit className="h-4 w-4" />
          Commit
          <kbd className="text-xs opacity-60">⌘⇧C</kbd>
        </Button>
      </div>

      {/* Right - Presence */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{presenceUsers.length}</span>
        </div>
        
        <div className="flex -space-x-2">
          {presenceUsers.map((user) => (
            <Avatar 
              key={user.id} 
              className={`h-7 w-7 border-2 border-background ring-2 ring-${user.color}`}
            >
              <AvatarFallback className={`bg-${user.color} text-white text-xs font-medium`}>
                {user.initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </header>
  );
}