import { useCallback, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { IDEHeader } from './IDEHeader';
import { FileTree } from './FileTree';
import { CodeEditor } from '../Editor/CodeEditor';
import { Terminal } from './Terminal';
import { VideoCall } from './VideoCall';
import { Chat } from './Chat';
import { FileExplorer } from '../Editor/FileExplorer';
import { FileNode, OpenFile, getFileLanguage } from '../../types/file';
import { EditorTabs } from '../Editor/EditorTabs';

// Initial file structure
const initialFiles: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    path: 'src',
    isOpen: true,
    children: [
      {
        id: 'app',
        name: 'App.tsx',
        type: 'file',
        path: 'src/App.tsx',
        content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React</h1>
        <p>Edit <code>src/App.tsx</code> and save to reload.</p>
      </header>
    </div>
  );
}

export default App;`
      },
      {
        id: 'index',
        name: 'index.tsx',
        type: 'file',
        path: 'src/index.tsx',
        content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
      },
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        path: 'src/components',
        children: [
          {
            id: 'button',
            name: 'Button.tsx',
            type: 'file',
            path: 'src/components/Button.tsx',
            content: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
};`
          }
        ]
      }
    ]
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    path: 'public',
    children: [
      {
        id: 'index-html',
        name: 'index.html',
        type: 'file',
        path: 'public/index.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`
      }
    ]
  },
  {
    id: 'package',
    name: 'package.json',
    type: 'file',
    path: 'package.json',
    content: `{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@types/node": "^16.18.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}`
  }
];

export function IDELayout() {
  const [activeTerminalTab, setActiveTerminalTab] = useState<'terminal' | 'console'>('terminal');
   const [files, setFiles] = useState<FileNode[]>(initialFiles);
    const [openFiles, setOpenFiles] = useState<OpenFile[]>([]);
    const [activeFileId, setActiveFileId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [isTerminalOpen, setIsTerminalOpen] = useState(true);
    const [terminalHeight, setTerminalHeight] = useState(200);
  
    // Helper function to find a file by path
    const findFileByPath = useCallback((path: string, nodes: FileNode[] = files): FileNode | null => {
      for (const node of nodes) {
        if (node.path === path) return node;
        if (node.children) {
          const found = findFileByPath(path, node.children);
          if (found) return found;
        }
      }
      return null;
    }, [files]);
  
    // Helper function to update file content
    const updateFileContent = useCallback((path: string, content: string, nodes: FileNode[] = files): FileNode[] => {
      return nodes.map(node => {
        if (node.path === path) {
          return { ...node, content, modified: true };
        }
        if (node.children) {
          return { ...node, children: updateFileContent(path, content, node.children) };
        }
        return node;
      });
    }, [files]);
  
    const handleFileSelect = (file: FileNode) => {
      if (file.type === 'folder') return;
      
      setSelectedFile(file.path);
      
      // Check if file is already open
      const existingFile = openFiles.find(f => f.path === file.path);
      if (existingFile) {
        setActiveFileId(existingFile.id);
        return;
      }
  
      // Open new file
      const openFile: OpenFile = {
        id: file.id,
        name: file.name,
        content: file.content || '',
        path: file.path,
        modified: false,
        language: getFileLanguage(file.name)
      };
  
      setOpenFiles(prev => [...prev, openFile]);
      setActiveFileId(openFile.id);
    };
  
    const handleTabSelect = (fileId: string) => {
      setActiveFileId(fileId);
      const file = openFiles.find(f => f.id === fileId);
      if (file) {
        setSelectedFile(file.path);
      }
    };
  
    const handleTabClose = (fileId: string) => {
      const fileIndex = openFiles.findIndex(f => f.id === fileId);
      if (fileIndex === -1) return;
  
      const newOpenFiles = openFiles.filter(f => f.id !== fileId);
      setOpenFiles(newOpenFiles);
  
      // Update active file if we closed the active one
      if (activeFileId === fileId) {
        if (newOpenFiles.length === 0) {
          setActiveFileId(null);
          setSelectedFile('');
        } else {
          // Select previous file or first file
          const newActiveFile = newOpenFiles[Math.max(0, fileIndex - 1)];
          setActiveFileId(newActiveFile.id);
          setSelectedFile(newActiveFile.path);
        }
      }
    };
  
    const handleContentChange = (content: string) => {
      if (!activeFileId) return;
  
      const activeFile = openFiles.find(f => f.id === activeFileId);
      if (!activeFile) return;
  
      // Update open file
      setOpenFiles(prev => prev.map(f => 
        f.id === activeFileId 
          ? { ...f, content, modified: content !== f.content }
          : f
      ));
  
      // Update file in tree
      setFiles(prev => updateFileContent(activeFile.path, content, prev));
    };
  
    const handleFileCreate = (parentPath: string, name: string, type: 'file' | 'folder') => {
      const newPath = parentPath === 'root' ? name : `${parentPath}/${name}`;
      const newFile: FileNode = {
        id: Date.now().toString(),
        name,
        type,
        path: newPath,
        content: type === 'file' ? '' : undefined,
        children: type === 'folder' ? [] : undefined
      };
  
      if (parentPath === 'root') {
        setFiles(prev => [...prev, newFile]);
      } else {
        // Add to parent folder
        const addToParent = (nodes: FileNode[]): FileNode[] => {
          return nodes.map(node => {
            if (node.path === parentPath && node.type === 'folder') {
              return { ...node, children: [...(node.children || []), newFile] };
            }
            if (node.children) {
              return { ...node, children: addToParent(node.children) };
            }
            return node;
          });
        };
        setFiles(prev => addToParent(prev));
      }
    };
  
    const handleFileRename = (path: string, newName: string) => {
      // Implementation for renaming files
      console.log('Rename file:', path, 'to', newName);
    };
  
    const handleFileDelete = (path: string) => {
      // Close tab if file is open
      const openFile = openFiles.find(f => f.path === path);
      if (openFile) {
        handleTabClose(openFile.id);
      }
  
      // Remove from tree
      const removeFromTree = (nodes: FileNode[]): FileNode[] => {
        return nodes.filter(node => {
          if (node.path === path) return false;
          if (node.children) {
            node.children = removeFromTree(node.children);
          }
          return true;
        });
      };
      
      setFiles(prev => removeFromTree(prev));
    };
  
    const activeFile = activeFileId ? openFiles.find(f => f.id === activeFileId) || null : null;
  
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <IDEHeader />
      
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Sidebar - File Tree */}
          <Panel defaultSize={20} minSize={15} maxSize={35}>
            <div className="h-full bg-card border-r border-border">
              <FileExplorer
                          files={files}
                          onFileSelect={handleFileSelect}
                          onFileCreate={handleFileCreate}
                          onFileRename={handleFileRename}
                          onFileDelete={handleFileDelete}
                          selectedFile={selectedFile}
                        />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />
          
          {/* Center - Editor + Bottom Dock */}
          <Panel defaultSize={60} minSize={40}>
            <PanelGroup direction="vertical">
              {/* Editor */}
              <Panel defaultSize={75} minSize={30}>
                <div className="flex-1 flex flex-col">
                          <EditorTabs
                            openFiles={openFiles}
                            activeFile={activeFileId}
                            onTabSelect={handleTabSelect}
                            onTabClose={handleTabClose}
                          />
                          
                          <div className="flex-1 flex ">
                            <CodeEditor
                              file={activeFile}
                              onContentChange={handleContentChange}
                            />
                            
                          </div>
                        </div>
              </Panel>
              
              <PanelResizeHandle className="h-1 bg-border hover:bg-primary/20 transition-colors" />
              
              {/* Bottom Dock - Terminal/Console */}
              <Panel defaultSize={25} minSize={15} maxSize={50}>
                <div className="h-full bg-terminal-bg">
                  <Terminal 
                    activeTab={activeTerminalTab} 
                    onTabChange={setActiveTerminalTab}
                  />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />
          
                            
          {/* Right Dock - Video + Chat */}
          <Panel defaultSize={20} minSize={15} maxSize={40}>
            <PanelGroup direction="vertical">
              {/* Video Call */}
              <Panel defaultSize={60} minSize={30}>
                <div className="h-full bg-card border-l border-border">
                  <VideoCall />
                </div>
              </Panel>
              
              <PanelResizeHandle className="h-1 bg-border hover:bg-primary/20 transition-colors" />
              
              {/* Chat */}
              <Panel defaultSize={40} minSize={20}>
                <div className="h-full bg-card border-l border-t border-border">
                  <Chat />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}