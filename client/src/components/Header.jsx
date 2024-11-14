import React from 'react';
import LanguageSelector from './LanguageSelector';

const Header = ({ onLanguageChange }) => {
  return (
    <header className="header">
      <h1>Syncode</h1>
      <LanguageSelector onChange={onLanguageChange} />
    </header>
  );
};

export default Header;
