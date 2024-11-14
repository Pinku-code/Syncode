import React, { useRef, useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ language, onCodeChange }) => {
  const editorRef = useRef();
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode('');
  }, [language]);

  const handleEditorChange = (value, event) => {
    setCode(value);
    onCodeChange(value);
  };

  return (
    <div className="code-editor">
      <MonacoEditor
        height="60vh"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          selectOnLineNumbers: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
