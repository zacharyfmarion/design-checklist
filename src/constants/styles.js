// @flow

export type FontSize = 'tiny' | 'small' | 'normal' | 'large' | 'huge';
export type Color = 'teal' | 'lightgray' | 'white' | 'black';

const fontSizes = {
  tiny: '8px',
  small: '10px',
  normal: '14px',
  large: '18px',
  huge: '24px',
  gigantic: '36px'
};

const colors = {
  primary: '#25b47d'
};

const shadow = '0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)';

const breakpoints = {
  desktop: 992,
  tablet: 768,
  mobile: 0
};

export { colors, fontSizes, shadow, breakpoints };
