import React from 'react';
import { X } from 'lucide-react';
import { FileIcon } from './FileIcon';
import { OpenFile } from '../types/file';

interface EditorTabsProps {
  openFiles: OpenFile[];
  activeFile: string | null;
  onTabSelect: (fileId: string) => void;
  onTabClose: (fileId: string) => void;
}

export const EditorTabs = ({ openFiles, activeFile, onTabSelect, onTabClose }: EditorTabsProps) => {
  if (openFiles.length === 0) {
    return null;
  }

  return (
    <div className="flex bg-tab-bg border-b border-tab-border overflow-x-auto">
      {openFiles.map((file) => (
        <div
          key={file.id}
          className={`
            flex items-center gap-2 px-3 py-2 min-w-0 border-r border-tab-border cursor-pointer group
            transition-colors relative
            ${activeFile === file.id 
              ? 'bg-tab-active text-white' 
              : 'bg-tab-bg text-gray-300 hover:bg-tab-hover'
            }
          `}
          onClick={() => onTabSelect(file.id)}
        >
          <FileIcon name={file.name} type="file" className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm truncate max-w-32">
            {file.name}
            {file.modified && <span className="text-vscode-orange ml-1">●</span>}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(file.id);
            }}
            className="p-0.5 rounded hover:bg-sidebar-hover opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
          
          {activeFile === file.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vscode-blue" />
          )}
        </div>
      ))}
    </div>
  );
};