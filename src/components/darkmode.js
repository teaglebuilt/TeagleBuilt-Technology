import React from 'react';
import Toggle from './toggle';
import useDarkMode from 'use-dark-mode';


const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

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