import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Circle, 
  Save, 
  Search, 
  MoreHorizontal,
  Users
} from 'lucide-react';

interface EditorTab {
  id: string;
  name: string;
  path: string;
  isModified: boolean;
  isActive: boolean;
}

const tabs: EditorTab[] = [
  { id: '1', name: 'TodoList.tsx', path: 'src/components/TodoList.tsx', isModified: false, isActive: true },
  { id: '2', name: 'App.tsx', path: 'src/App.tsx', isModified: true, isActive: false },
  { id: '3', name: 'useTodos.ts', path: 'src/hooks/useTodos.ts', isModified: false, isActive: false }
];

const sampleCode = `import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (text: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onAdd }: TodoListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <AddTodo onAdd={onAdd} />
      
      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={\`px-3 py-1 rounded \${
              filter === f 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }\`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}`;

export function CodeEditor() {
  const [activeTab, setActiveTab] = useState('1');

  const collaborators = [
    { id: 1, name: 'Sarah', line: 15, color: 'presence-2' },
    { id: 2, name: 'Mike', line: 28, color: 'presence-3' }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex items-center bg-card border-b border-border">
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`
                group flex items-center gap-2 px-3 py-2 border-r border-border cursor-pointer
                min-w-0 max-w-48 transition-colors
                ${tab.isActive 
                  ? 'bg-background text-foreground border-b-2 border-primary' 
                  : 'bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }
              `}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-xs truncate">{tab.name}</span>
              {tab.isModified && (
                <Circle className="h-2 w-2 fill-current text-primary" />
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-1 px-2">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="w-12 bg-muted/30 border-r border-border flex flex-col text-right text-xs font-mono text-editor-line-numbers pt-3 pb-3">
          {sampleCode.split('\n').map((_, index) => (
            <div 
              key={index} 
              className="h-5 leading-5 pr-2 relative"
            >
              {index + 1}
              {/* Collaborator cursors */}
              {collaborators.map(collab => 
                collab.line === index + 1 && (
                  <div 
                    key={collab.id}
                    className={`absolute right-0 top-0 w-0.5 h-5 bg-${collab.color}`}
                  />
                )
              )}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <pre className="h-full overflow-auto p-3 text-sm font-mono leading-5 whitespace-pre-wrap">
            <code className="text-foreground">
              {sampleCode.split('\n').map((line, index) => (
                <div key={index} className="relative">
                  {/* Syntax highlighting simulation */}
                  <span 
                    className={`
                      ${line.includes('import') || line.includes('export') ? 'text-accent' : ''}
                      ${line.includes('function') || line.includes('const') || line.includes('interface') ? 'text-primary' : ''}
                      ${line.includes('//') ? 'text-muted-foreground italic' : ''}
                      ${line.includes("'") || line.includes('"') ? 'text-terminal-green' : ''}
                    `}
                  >
                    {line || '\u00A0'}
                  </span>
                  
                  {/* Collaborator info */}
                  {collaborators.map(collab => 
                    collab.line === index + 1 && (
                      <Badge 
                        key={collab.id}
                        variant="secondary" 
                        className={`absolute right-2 top-0 text-xs bg-${collab.color}/10 text-${collab.color} border border-${collab.color}/20`}
                      >
                        <Users className="h-3 w-3 mr-1" />
                        {collab.name}
                      </Badge>
                    )
                  )}
                </div>
              ))}
            </code>
          </pre>
          
          {/* Minimap */}
          <div className="absolute top-0 right-0 w-20 h-full bg-muted/20 border-l border-border">
            <div className="h-full p-1">
              <div className="w-full h-2/3 bg-muted/40 rounded-sm relative">
                <div className="absolute top-1/4 left-0 w-full h-8 bg-primary/20 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}