import React from 'react';
import { GitBranch, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { OpenFile } from '../types/file';

interface StatusBarProps {
  activeFile: OpenFile | null;
  filesCount: number;
  linesCount: number;
}

export const StatusBar = ({ activeFile, filesCount, linesCount }: StatusBarProps) => {
  return (
    <div className="flex items-center justify-between px-3 py-1 bg-status-bg border-t border-sidebar-border text-xs text-gray-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </div>
        
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-vscode-green" />
          <span>No issues</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {activeFile && (
          <>
            <div className="flex items-center gap-1">
              <span>Ln 1, Col 1</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span>UTF-8</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="capitalize">{activeFile.language}</span>
            </div>
          </>
        )}
        
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>

        <div className="flex items-center gap-1">
          <span>{filesCount} files</span>
        </div>
      </div>
    </div>
  );
};