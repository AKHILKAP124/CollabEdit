import React, { useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square, RotateCcw } from 'lucide-react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  height: number;
  onHeightChange: (height: number) => void;
}

export const Terminal = ({ isOpen, onToggle, height, onHeightChange }: TerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  // Initialize xterm
  useEffect(() => {
    if (!isOpen || !terminalRef.current) return;

    if (!xtermRef.current) {
      const terminal = new XTerm({
        theme: {
          background: '#1e1e1e',
          foreground: '#cccccc',
          cursor: '#cccccc',
          selectionBackground: '#264f78',
          black: '#000000',
          red: '#cd3131',
          green: '#0dbc79',
          yellow: '#e5e510',
          blue: '#2472c8',
          magenta: '#bc3fbc',
          cyan: '#11a8cd',
          white: '#e5e5e5',
          brightBlack: '#666666',
          brightRed: '#f14c4c',
          brightGreen: '#23d18b',
          brightYellow: '#f5f543',
          brightBlue: '#3b8eea',
          brightMagenta: '#d670d6',
          brightCyan: '#29b8db',
          brightWhite: '#e5e5e5'
        },
        fontFamily: 'JetBrains Mono, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 14,
        lineHeight: 1.2,
        cursorBlink: true,
        cursorStyle: 'block',
        scrollback: 1000,
        tabStopWidth: 4
      });

      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      
      terminal.open(terminalRef.current);
      fitAddon.fit();

      // Welcome message
      terminal.writeln('\x1b[1;32m┌─[lovable-code-editor]─[~/project]');
      terminal.writeln('└─$ \x1b[0m\x1b[36mWelcome to the integrated terminal!\x1b[0m');
      terminal.writeln('\x1b[33mType "help" to see available commands\x1b[0m');
      terminal.write('\x1b[1;32m└─$ \x1b[0m');

      let currentLine = '';

      // Handle input
      terminal.onData((data) => {
        switch (data) {
          case '\r': // Enter
            terminal.write('\r\n');
            handleCommand(terminal, currentLine.trim());
            currentLine = '';
            terminal.write('\x1b[1;32m└─$ \x1b[0m');
            break;
          case '\x7f': // Backspace
            if (currentLine.length > 0) {
              currentLine = currentLine.slice(0, -1);
              terminal.write('\b \b');
            }
            break;
          case '\x03': // Ctrl+C
            terminal.write('^C\r\n');
            currentLine = '';
            terminal.write('\x1b[1;32m└─$ \x1b[0m');
            break;
          default:
            if (data >= ' ') {
              currentLine += data;
              terminal.write(data);
            }
        }
      });

      xtermRef.current = terminal;
      fitAddonRef.current = fitAddon;
    }
  }, [isOpen]);

  // Handle commands
  const handleCommand = (terminal: XTerm, command: string) => {
    if (!command) return;

    switch (command.toLowerCase()) {
      case 'help':
        terminal.writeln('\x1b[36mAvailable commands:\x1b[0m');
        terminal.writeln('  help         - Show this help message');
        terminal.writeln('  clear        - Clear the terminal');
        terminal.writeln('  ls           - List directory contents');
        terminal.writeln('  pwd          - Print working directory');
        terminal.writeln('  echo [text]  - Echo text');
        terminal.writeln('  npm install  - Install dependencies');
        terminal.writeln('  npm start    - Start development server');
        terminal.writeln('  git status   - Show git status');
        terminal.writeln('  date         - Show current date');
        terminal.writeln('  whoami       - Show current user');
        break;
      case 'clear':
        terminal.clear();
        break;
      case 'ls':
        terminal.writeln('\x1b[34msrc/\x1b[0m          \x1b[34mpublic/\x1b[0m       package.json');
        terminal.writeln('README.md     \x1b[34mnode_modules/\x1b[0m tailwind.config.ts');
        break;
      case 'pwd':
        terminal.writeln('/home/user/project');
        break;
      case 'npm install':
        terminal.writeln('\x1b[33m📦 Installing dependencies...\x1b[0m');
        setTimeout(() => {
          terminal.writeln('\x1b[32m✅ Dependencies installed successfully\x1b[0m');
        }, 1000);
        break;
      case 'npm start':
        terminal.writeln('\x1b[32m🚀 Starting development server...\x1b[0m');
        terminal.writeln('\x1b[36m🌐 Local:   http://localhost:3000\x1b[0m');
        break;
      case 'git status':
        terminal.writeln('\x1b[32mOn branch main\x1b[0m');
        terminal.writeln('nothing to commit, working tree clean');
        break;
      case 'date':
        terminal.writeln(new Date().toString());
        break;
      case 'whoami':
        terminal.writeln('developer');
        break;
      default:
        if (command.startsWith('echo ')) {
          terminal.writeln(command.substring(5));
        } else {
          terminal.writeln(`\x1b[31mCommand not found: ${command}\x1b[0m`);
          terminal.writeln('Type "help" to see available commands');
        }
    }
  };

  // Resize terminal when height changes
  useEffect(() => {
    if (xtermRef.current && fitAddonRef.current && isOpen) {
      setTimeout(() => {
        fitAddonRef.current?.fit();
      }, 100);
    }
  }, [height, isOpen]);

  // Handle resizing
  useEffect(() => {
    const resizer = resizerRef.current;
    if (!resizer) return;

    let isResizing = false;
    let startY = 0;
    let startHeight = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isResizing = true;
      startY = e.clientY;
      startHeight = height;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const deltaY = startY - e.clientY;
      const newHeight = Math.max(100, Math.min(600, startHeight + deltaY));
      onHeightChange(newHeight);
    };

    const handleMouseUp = () => {
      isResizing = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    resizer.addEventListener('mousedown', handleMouseDown);
    return () => resizer.removeEventListener('mousedown', handleMouseDown);
  }, [height, onHeightChange]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (xtermRef.current) {
        xtermRef.current.dispose();
        xtermRef.current = null;
      }
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-terminal-bg border-t border-sidebar-border" style={{ height: `${height}px` }}>
      {/* Resizer */}
      <div 
        ref={resizerRef}
        className="h-1 bg-sidebar-border hover:bg-vscode-blue cursor-row-resize transition-colors"
      />
      
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-1 bg-terminal-bg border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-300">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => xtermRef.current?.clear()}
            className="p-1 hover:bg-sidebar-hover rounded transition-colors"
            title="Clear Terminal"
          >
            <RotateCcw className="w-3 h-3 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-sidebar-hover rounded transition-colors">
            <Minus className="w-3 h-3 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-sidebar-hover rounded transition-colors">
            <Square className="w-3 h-3 text-gray-400" />
          </button>
          <button 
            onClick={onToggle}
            className="p-1 hover:bg-sidebar-hover rounded transition-colors"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1"
        style={{ height: `${height - 40}px` }}
      />
    </div>
  );
};