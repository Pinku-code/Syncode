import React from 'react';

const OutputConsole = ({ output }) => {
  return (
    <div className="output-console">
      <h3>Output</h3>
      <pre>{output}</pre>
    </div>
  );
};

export default OutputConsole;
