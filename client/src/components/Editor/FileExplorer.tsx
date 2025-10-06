import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, MoreHorizontal } from 'lucide-react';
import { FileIcon } from './FileIcon';
import { FileNode } from '../../types/file';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../ui/context-menu';

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  onFileCreate: (parentPath: string, name: string, type: 'file' | 'folder') => void;
  onFileRename: (path: string, newName: string) => void;
  onFileDelete: (path: string) => void;
  selectedFile?: string;
}

export const FileExplorer = ({ 
  files, 
  onFileSelect, 
  onFileCreate, 
  onFileRename, 
  onFileDelete,
  selectedFile 
}: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleRename = (item: FileNode) => {
    setEditingItem(item.path);
    setEditingName(item.name);
  };

  const confirmRename = (path: string) => {
    if (editingName.trim() && editingName !== path.split('/').pop()) {
      onFileRename(path, editingName);
    }
    setEditingItem(null);
    setEditingName('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, path: string) => {
    if (e.key === 'Enter') {
      confirmRename(path);
    } else if (e.key === 'Escape') {
      setEditingItem(null);
      setEditingName('');
    }
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;
    const isEditing = editingItem === node.path;

    return (
      <div key={node.path}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div 
              className={`
                flex items-center gap-1 px-2 py-1 text-sm cursor-pointer select-none
                hover:bg-sidebar-hover transition-colors group
                ${isSelected ? 'bg-sidebar-active text-white' : 'text-gray-300'}
              `}
              style={{ paddingLeft: `${8 + depth * 16}px` }}
              onClick={() => {
                if (node.type === 'folder') {
                  toggleFolder(node.path);
                } else {
                  onFileSelect(node);
                }
              }}
            >
              {node.type === 'folder' && (
                <div 
                  className="flex items-center justify-center w-4 h-4 hover:bg-sidebar-border rounded transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(node.path);
                  }}
                >
                  {isExpanded ? 
                    <ChevronDown className="w-3 h-3" /> : 
                    <ChevronRight className="w-3 h-3" />
                  }
                </div>
              )}
              
              <FileIcon 
                name={node.name} 
                type={node.type} 
                isOpen={isExpanded}
                className="w-4 h-4 flex-shrink-0" 
              />
              
              {isEditing ? (
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => confirmRename(node.path)}
                  onKeyDown={(e) => handleKeyPress(e, node.path)}
                  className="bg-sidebar-hover border border-vscode-blue rounded px-1 text-xs flex-1 outline-none"
                  autoFocus
                />
              ) : (
                <span className="flex-1 truncate">
                  {node.name}
                  {node.modified && <span className="text-vscode-orange ml-1">●</span>}
                </span>
              )}
            </div>
          </ContextMenuTrigger>
          
          <ContextMenuContent className="bg-context-bg border-sidebar-border">
            <ContextMenuItem 
              onClick={() => onFileCreate(node.type === 'folder' ? node.path : node.path.split('/').slice(0, -1).join('/'), 'New File', 'file')}
              className="text-gray-300 hover:bg-context-hover focus:bg-context-hover"
            >
              <Plus className="w-4 h-4 mr-2" />
              New File
            </ContextMenuItem>
            <ContextMenuItem 
              onClick={() => onFileCreate(node.type === 'folder' ? node.path : node.path.split('/').slice(0, -1).join('/'), 'New Folder', 'folder')}
              className="text-gray-300 hover:bg-context-hover focus:bg-context-hover"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Folder
            </ContextMenuItem>
            <ContextMenuItem 
              onClick={() => handleRename(node)}
              className="text-gray-300 hover:bg-context-hover focus:bg-context-hover"
            >
              Rename
            </ContextMenuItem>
            <ContextMenuItem 
              onClick={() => onFileDelete(node.path)}
              className="text-vscode-red hover:bg-context-hover focus:bg-context-hover"
            >
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-sidebar-bg border-r border-sidebar-border h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
          Explorer
        </span>
        <div className="flex gap-1">
          <button 
            onClick={() => onFileCreate('root', 'New File', 'file')}
            className="p-1 hover:bg-sidebar-hover rounded transition-colors"
            title="New File"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-sidebar-hover rounded transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {files.map(file => renderFileNode(file))}
      </div>
    </div>
  );
};