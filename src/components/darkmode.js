import React from 'react';
import Toggle from './toggle';
import useDarkMode from 'use-dark-mode';
import classes from '../styles/index.sass'


const DarkModeToggle = () => {
  const darkMode = useDarkMode(false, document.body.getRootNode());

  return (
    <>
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </>
  );
};

export default DarkModeToggle;