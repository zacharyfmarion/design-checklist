// @flow

export type FontSize = 'tiny' | 'small' | 'normal' | 'large' | 'huge';
export type Color = 'teal' | 'lightgray' | 'white' | 'black';

const primaryColors = [
  {
    title: 'Green',
    color: '#25b47d',
  },
  {
    title: 'Teal',
    color: '#00BCD4',
  },
  {
    title: 'Blue',
    color: '#1565c0',
  },
  {
    title: 'Indigo',
    color: '#673ab7',
  },
  {
    title: 'Orange',
    color: '#f57c00',
  },
  {
    title: 'Red',
    color: '#f44336',
  },
  {
    title: 'Pink',
    color: '#ec407a',
  },
  {
    title: 'Slate',
    color: '#455a64',
  },
];

const fontSizes = {
  tiny: '8px',
  small: '10px',
  normal: '14px',
  large: '18px',
  huge: '24px',
  gigantic: '36px',
};

const colors = {
  primary: primaryColors[0].color,
  good: '#25b47d',
  average: '#fdd75f',
  bad: '#f57c00',
  terrible: '#e63e3e',
};

const themes = {
  light: {
    background: '#fff',
    backgroundSecondary: '#fff',
    color: '#000',
    colorSecondary: 'gray',
    shadow: '0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)',
  },
  dark: {
    background: '#212121',
    // light background color
    backgroundSecondary: '#404040',
    color: '#fff',
    colorSecondary: 'lightgray',
    shadow: '0 15px 27px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
  },
};

const breakpoints = {
  desktop: 992,
  tablet: 768,
  mobile: 0,
};

export { primaryColors, colors, themes, fontSizes, breakpoints };
