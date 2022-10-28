const theme = {
  color: {
    'black-300': '#979797',
    'black-600': '#464646',
    'black-900': '#000000',
  },
} as const;

export type TypeForMakingTheme = typeof theme;

export default theme;
