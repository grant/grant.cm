const Color = require('color');
// eslint-disable-next-line no-unused-vars
const alpha = (clr, val) => Color(clr).alpha(val).rgb().string();
const lighten = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: {
        DEFAULT: 'rgb(255, 255, 255)',
        dark: 'rgb(225, 225, 225)',
      },
      gray: {
        light: 'rgb(190, 190, 190)',
        DEFAULT: 'rgb(119, 119, 119)',
        dark: 'rgb(65, 64, 61)',
      },
      black: {
        light: 'rgb(34, 34, 34)',
        DEFAULT: 'rgb(24, 24, 24)',
      },
      brown: {
        DEFAULT: 'rgb(119, 107, 93)',
      },
      red: {
        light: 'rgb(242, 144, 135)',
        DEFAULT: 'rgb(234, 95, 78)',
        dark: 'rgb(160, 47, 42)',
      },
      orange: {
        lightest: '#f3bd96',
        light: '#eda169',
        DEFAULT: 'rgb(232, 132, 59)',
        dark: '#d76919',
      },
      yellow: {
        DEFAULT: 'rgb(255, 236, 132)',
      },
      green: {
        DEFAULT: 'rgb(138, 192, 158)',
      },
      aqua: {
        DEFAULT: 'rgb(100, 200, 200)',
      },
      blue: {
        DEFAULT: 'rgb(145, 207, 215)',
        light: lighten('blue', 0.2),
        dark: darken('blue', 0.2),
      },
      blueBlack: {
        DEFAULT: 'rgb(45, 62, 82)',
      },
      purple: {
        DEFAULT: 'rgb(183, 143, 216)',
      },
    },
    fontSize: {
      xhuge: '130px',
      huge: '100px',
      xxlarge: '80px',
      xlarge: '50px',
      large: '40px',
      medium: '26px',
      small: '16px',
      xsmall: '12px',
      xxsmall: '8px',
    },
    transitionDuration: {
      normal: '200ms',
    },
    fontFamily: {
      normal: [
        'Open Sans',
        'Helvetica Neue Thin',
        'HelveticaNeue-Thin',
        'helvetica neue',
        'helvetica',
        'arial',
        'lucida grande',
        'sans-serif',
      ],
    },
  },
  plugins: [],
};
