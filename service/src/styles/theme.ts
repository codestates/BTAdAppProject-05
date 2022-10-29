const theme = {
  color: {
    black300: '#979797',
    black600: '#464646',
    black900: '#000000',
  },
} as const;

export type TypeForMakingTheme = typeof theme;

export default theme;
