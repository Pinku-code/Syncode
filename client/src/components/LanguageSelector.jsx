import React, { useState } from 'react';

const LanguageSelector = ({ onChange }) => {
  const [language, setLanguage] = useState('cpp');

  const handleChange = (e) => {
    setLanguage(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language">Language: </label>
      <select id="language" value={language} onChange={handleChange}>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
