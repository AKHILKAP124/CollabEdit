import React from 'react';
import Editor from '@monaco-editor/react';
import { OpenFile } from '../types/file';

interface CodeEditorProps {
  file: OpenFile | null;
  onContentChange: (content: string) => void;
}

export const CodeEditor = ({ file, onContentChange }: CodeEditorProps) => {
  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center bg-editor-bg">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium mb-2">Welcome to VS Code Editor</h3>
          <p className="text-sm">Select a file from the explorer to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-editor-bg">
      <Editor
        height="100%"
        language={file.language}
        value={file.content}
        onChange={(value) => onContentChange(value || '')}
        theme="vs-dark"
        options={{
          fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
          fontSize: 14,
          minimap: { enabled: true },
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          renderLineHighlight: 'all',
          bracketPairColorization: { enabled: true },
          guides: {
            indentation: true,
            bracketPairs: true,
          },
          suggest: {
            showKeywords: true,
            showSnippets: true,
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
        }}
      />
    </div>
  );
};