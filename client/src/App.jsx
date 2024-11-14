import React, { useState } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import OutputConsole from './components/OutputConsole';
import Sidebar from './components/Sidebar';
import './styles/styles.css';

const App = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
      } else {
        setOutput(`Error: ${data.error}`);
      }
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header onLanguageChange={setLanguage} />
        <CodeEditor language={language} onCodeChange={handleCodeChange} />
        <div className="footer">
          <button onClick={handleRunCode}>Run Code</button>
        </div>
        <OutputConsole output={output} />
      </div>
    </div>
  );
};

export default App;
