import React from 'react';

const ThemeToggle = ({ toggleTheme, isDarkMode }) => {
    return (
      <div
        className="mb-4 p-2 text-center"
        onClick={toggleTheme}
        style={{
          cursor: 'pointer',
          backgroundColor: isDarkMode ? '#6c757d' : '#343a40',
          color: 'white',
          width: '100px',
        }}
      >
        {isDarkMode ? 'Light' : 'Dark'}
      </div>
    );
  };  

export default ThemeToggle;