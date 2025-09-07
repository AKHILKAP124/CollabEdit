import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { IDEHeader } from './IDEHeader';
import { FileTree } from './FileTree';
import { CodeEditor } from './CodeEditor';
import { Terminal } from './Terminal';
import { VideoCall } from './VideoCall';
import { Chat } from './Chat';

export function IDELayout() {
  const [activeTerminalTab, setActiveTerminalTab] = useState<'terminal' | 'console'>('terminal');

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
              <FileTree />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />
          
          {/* Center - Editor + Bottom Dock */}
          <Panel defaultSize={60} minSize={40}>
            <PanelGroup direction="vertical">
              {/* Editor */}
              <Panel defaultSize={75} minSize={30}>
                <div className="h-full bg-editor-bg">
                  <CodeEditor />
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