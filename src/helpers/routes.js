const capitalize = (string: string) =>
  string
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const encodeParam = (param: string) =>
  param.replace(' ', '_').toLowerCase();

export const decodeParam = (param: string) =>
  capitalize(param.replace('_', ' '));
