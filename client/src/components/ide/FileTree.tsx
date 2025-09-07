import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Folder, 
  FolderOpen, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  Plus,
  MoreHorizontal
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  isOpen?: boolean;
}

const fileTree: FileItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        isOpen: true,
        children: [
          { id: '3', name: 'TodoList.tsx', type: 'file' },
          { id: '4', name: 'TodoItem.tsx', type: 'file' },
          { id: '5', name: 'AddTodo.tsx', type: 'file' }
        ]
      },
      {
        id: '6',
        name: 'hooks',
        type: 'folder',
        children: [
          { id: '7', name: 'useTodos.ts', type: 'file' }
        ]
      },
      { id: '8', name: 'App.tsx', type: 'file' },
      { id: '9', name: 'main.tsx', type: 'file' }
    ]
  },
  {
    id: '10',
    name: 'public',
    type: 'folder',
    children: [
      { id: '11', name: 'index.html', type: 'file' }
    ]
  },
  { id: '12', name: 'package.json', type: 'file' },
  { id: '13', name: 'vite.config.ts', type: 'file' },
  { id: '14', name: 'README.md', type: 'file' }
];

export function FileTree() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFile, setSelectedFile] = useState('3'); // TodoList.tsx selected

  const FileTreeItem = ({ item, depth = 0 }: { item: FileItem; depth?: number }) => {
    const isSelected = selectedFile === item.id;
    
    return (
      <div>
        <div 
          className={`
            flex items-center gap-2 px-2 py-1 text-sm cursor-pointer
            hover:bg-muted/50 transition-colors
            ${isSelected ? 'bg-primary/10 text-primary' : 'text-foreground'}
          `}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => item.type === 'file' && setSelectedFile(item.id)}
        >
          {item.type === 'folder' ? (
            <>
              {item.isOpen ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              {item.isOpen ? (
                <FolderOpen className="h-4 w-4 text-accent" />
              ) : (
                <Folder className="h-4 w-4 text-accent" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              <FileText className="h-4 w-4 text-muted-foreground" />
            </>
          )}
          <span className="flex-1 truncate">{item.name}</span>
        </div>
        
        {item.type === 'folder' && item.isOpen && item.children && (
          <div>
            {item.children.map((child) => (
              <FileTreeItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Explorer</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-7 pl-8 text-xs"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {fileTree.map((item) => (
          <FileTreeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}