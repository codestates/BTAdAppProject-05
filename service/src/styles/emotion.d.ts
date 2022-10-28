import '@emotion/react';
import { TypeForMakingTheme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends TypeForMakingTheme {}
}
