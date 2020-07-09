import React from 'react';

export const themeConfig = {
  light: {
    fontColor: '#333333',
    bodyBg: '#fff',
  },

  dark: {
    fontColor: '#fff',
    bodyBg: '#333333',
  },
};

const ThemeContext = React.createContext(themeConfig.light);
export default ThemeContext;
