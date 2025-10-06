import { 
  FileText, 
  Folder, 
  FolderOpen, 
  FileJson, 
  Globe, 
  Palette, 
  FileCode,
  Database,
  Settings,
  Image,
  Terminal
} from 'lucide-react';

interface FileIconProps {
  name: string;
  type: 'file' | 'folder';
  isOpen?: boolean;
  className?: string;
}

export const FileIcon = ({ name, type, isOpen, className = "w-4 h-4" }: FileIconProps) => {
  if (type === 'folder') {
    return isOpen ? 
      <FolderOpen className={`${className} text-vscode-blue`} /> : 
      <Folder className={`${className} text-sidebar-hover`} />;
  }
  
  const ext = name.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'js':
    case 'jsx':
      return <FileCode className={`${className} text-yellow-400`} />;
    case 'ts':
    case 'tsx':
      return <FileCode className={`${className} text-blue-400`} />;
    case 'json':
      return <FileJson className={`${className} text-vscode-orange`} />;
    case 'html':
    case 'htm':
      return <Globe className={`${className} text-orange-500`} />;
    case 'css':
    case 'scss':
    case 'sass':
      return <Palette className={`${className} text-blue-500`} />;
    case 'md':
    case 'markdown':
      return <FileText className={`${className} text-blue-300`} />;
    case 'sql':
      return <Database className={`${className} text-green-400`} />;
    case 'xml':
    case 'yml':
    case 'yaml':
      return <Settings className={`${className} text-gray-400`} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
      return <Image className={`${className} text-purple-400`} />;
    case 'sh':
    case 'bash':
      return <Terminal className={`${className} text-green-500`} />;
    default:
      return <FileText className={`${className} text-gray-300`} />;
  }
};