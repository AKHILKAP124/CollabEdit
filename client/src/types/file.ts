export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  isOpen?: boolean;
  path: string;
  modified?: boolean;
}

export interface OpenFile {
  id: string;
  name: string;
  content: string;
  path: string;
  modified: boolean;
  language: string;
}

export type FileLanguage = 
  | 'javascript' 
  | 'typescript' 
  | 'json' 
  | 'html' 
  | 'css' 
  | 'scss' 
  | 'markdown' 
  | 'xml' 
  | 'yaml' 
  | 'python' 
  | 'java' 
  | 'cpp' 
  | 'go' 
  | 'rust' 
  | 'php' 
  | 'sql'
  | 'plaintext';

export const getFileLanguage = (filename: string): FileLanguage => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'json':
      return 'json';
    case 'html':
    case 'htm':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
    case 'sass':
      return 'scss';
    case 'md':
    case 'markdown':
      return 'markdown';
    case 'xml':
      return 'xml';
    case 'yml':
    case 'yaml':
      return 'yaml';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'cpp':
    case 'cc':
    case 'cxx':
      return 'cpp';
    case 'go':
      return 'go';
    case 'rs':
      return 'rust';
    case 'php':
      return 'php';
    case 'sql':
      return 'sql';
    default:
      return 'plaintext';
  }
};