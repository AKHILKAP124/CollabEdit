import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal as TerminalIcon, 
  Bug, 
  X, 
  Plus,
  MoreHorizontal,
  Play,
  Square
} from 'lucide-react';

interface TerminalProps {
  activeTab: 'terminal' | 'console';
  onTabChange: (tab: 'terminal' | 'console') => void;
}

const terminalOutput = [
  { type: 'info', text: '$ npm run dev', timestamp: '14:32:01' },
  { type: 'info', text: '', timestamp: '' },
  { type: 'success', text: '> react-todo-app@0.1.0 dev', timestamp: '14:32:02' },
  { type: 'success', text: '> vite', timestamp: '14:32:02' },
  { type: 'info', text: '', timestamp: '' },
  { type: 'info', text: '  VITE v5.0.0  ready in 847 ms', timestamp: '14:32:03' },
  { type: 'info', text: '', timestamp: '' },
  { type: 'success', text: '  ➜  Local:   http://localhost:5173/', timestamp: '14:32:03' },
  { type: 'success', text: '  ➜  Network: use --host to expose', timestamp: '14:32:03' },
  { type: 'info', text: '', timestamp: '' },
  { type: 'success', text: '  ➜  press h + enter to show help', timestamp: '14:32:03' },
];

const consoleOutput = [
  { type: 'log', text: 'React DevTools: Connected', timestamp: '14:32:05' },
  { type: 'warn', text: 'Warning: Each child in a list should have a unique "key" prop', timestamp: '14:32:12' },
  { type: 'info', text: 'TodoList.tsx:24', timestamp: '' },
  { type: 'log', text: 'User added new todo: "Learn React Hooks"', timestamp: '14:32:45' },
  { type: 'error', text: 'TypeError: Cannot read properties of undefined (reading \'map\')', timestamp: '14:33:01' },
  { type: 'info', text: '    at TodoList (TodoList.tsx:18:21)', timestamp: '' },
  { type: 'info', text: '    at App (App.tsx:12:5)', timestamp: '' },
];

export function Terminal({ activeTab, onTabChange }: TerminalProps) {
  const [isRunning, setIsRunning] = useState(true);

  const getOutputColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-terminal-green';
      case 'error': return 'text-terminal-red';
      case 'warn': return 'text-terminal-yellow';
      case 'info': return 'text-terminal-blue';
      case 'log': return 'text-terminal-text';
      default: return 'text-terminal-text';
    }
  };

  return (
    <div className="h-full flex flex-col bg-terminal-bg">
      {/* Tab Bar */}
      <div className="flex items-center justify-between bg-card border-b border-border px-2">
        <div className="flex">
          <button
            onClick={() => onTabChange('terminal')}
            className={`
              flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors
              ${activeTab === 'terminal' 
                ? 'text-foreground border-b-2 border-primary bg-background' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <TerminalIcon className="h-4 w-4" />
            Terminal
            <Badge variant="secondary" className="text-xs">1</Badge>
          </button>
          
          <button
            onClick={() => onTabChange('console')}
            className={`
              flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors
              ${activeTab === 'console' 
                ? 'text-foreground border-b-2 border-primary bg-background' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <Bug className="h-4 w-4" />
            Console
            <Badge variant="destructive" className="text-xs">2</Badge>
          </button>
        </div>

        {activeTab === 'terminal' &&
        (<div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <Square className="h-3 w-3 fill-current text-terminal-red" />
            ) : (
              <Play className="h-3 w-3 text-terminal-green" />
            )}
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )
        }
      </div>

      {/* Output Area */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-sm">
        {activeTab === 'terminal' && (
          <div className="space-y-0.5">
            {terminalOutput.map((line, index) => (
              <div key={index} className="flex items-start gap-3">
                {line.timestamp && (
                  <span className="text-muted-foreground text-xs w-16 shrink-0 mt-0.5">
                    {line.timestamp}
                  </span>
                )}
                <span className={`${getOutputColor(line.type)} leading-5`}>
                  {line.text || '\u00A0'}
                </span>
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-muted-foreground text-xs w-16 shrink-0">
                {new Date().toLocaleTimeString([], { hour12: false })}
              </span>
              <span className="text-terminal-text">
                $ <span className="bg-editor-cursor w-2 h-5 inline-block ml-1 animate-pulse" />
              </span>
            </div>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="space-y-0.5">
            {consoleOutput.map((line, index) => (
              <div key={index} className="flex items-start gap-3">
                {line.timestamp && (
                  <span className="text-muted-foreground text-xs w-16 shrink-0 mt-0.5">
                    {line.timestamp}
                  </span>
                )}
                <span className={`${getOutputColor(line.type)} leading-5`}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}