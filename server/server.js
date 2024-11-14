const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to execute code
app.post('/execute', (req, res) => {
  const { code, language } = req.body;

  // Determine file extension based on the language
  const sourceFile = `temp.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'cpp'}`;
  const compiledFile = language === 'cpp' ? 'temp' : null;

  // Save the code to the corresponding source file
  fs.writeFileSync(sourceFile, code);

  let command;
  switch (language) {
    case 'javascript':
      command = `node ${sourceFile}`;
      break;
    case 'python':
      command = `python ${sourceFile}`;
      break;
    case 'cpp':
      // Compile and run C++ code
      const executable = process.platform === 'win32' ? 'temp.exe' : 'temp';
      command = `g++ ${sourceFile} -o ${executable} && ${process.platform === 'win32' ? executable : `./${executable}`}`;
      break;
    default:
      return res.status(400).json({ error: 'Language not supported' });
  }

  // Execute the command to run the code
  exec(command, (error, stdout, stderr) => {
    // Clean up: delete the source and compiled files after execution
    fs.unlinkSync(sourceFile);
    if (compiledFile && fs.existsSync(compiledFile)) {
      fs.unlinkSync(compiledFile);
    }
    // If on Windows, also delete the executable file
    if (process.platform === 'win32' && fs.existsSync('temp.exe')) {
      fs.unlinkSync('temp.exe');
    }

    if (error) {
      res.status(500).json({ output: stderr });
    } else {
      res.status(200).json({ output: stdout });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
