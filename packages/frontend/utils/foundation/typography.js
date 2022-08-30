import { clamp } from './clamp';

export const typography = {
  letterSpacings: {
    tight: '-0.005em',
    normal: '0',
    wide: '0.005em',
  },

  lineHeights: {
    none: 1,
    short: 1.2,
    base: 1.5,
  },

  fontWeights: {
    normal: 400,
    bold: 700,
  },

  fonts: {
    heading: `'bpdotsunicasesquarebold', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    body: `'bpdotsunicasesquarebold', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },

  fontSizes: {
    sm: clamp(14, 14),
    md: clamp(16, 16),
    lg: clamp(20, 20),
  },
};
