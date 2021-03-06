// @flow

import { colors } from 'constants/styles';

// Get the severity colors
const { good, average, bad, terrible } = colors;

// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
export function shadeColor(color: string, percent: number): string {
  var f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

export function validHex(value: string): boolean {
  const regExp = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
  return typeof value === 'string' && regExp.test(value);
}

// Create an array of colors from dark to light
// range contains an array of numbers that we need to normalize and then
// use to determine the color intensities
export function colorRange(color: string, range: Array<number>): Array<string> {
  // first normalize the range between 0 and 1
  const max = Math.max.apply(null, range);
  return range.map(intensity => shadeColor(color, (1 - intensity / max) / 2));
}

const severityMap = (percent: number) => {
  if (percent === 1) {
    return terrible;
  } else if (percent < 1 && percent >= 0.75) {
    return terrible;
  } else if (percent < 0.75 && percent >= 0.5) {
    return bad;
  } else if (percent < 0.5 && percent >= 0.25) {
    return average;
  }
  return good;
};

// Given an array of numbers return an array of colors based on the normalized
// severity of each color
export function colorSeverity(range: Array<number>) {
  const max = Math.max.apply(null, range);
  return range.map(count => severityMap(count / max));
}
