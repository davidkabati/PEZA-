import { createTheme, createText, createBox } from '@shopify/restyle';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const theme = createTheme({
  colors: {
    primary: '#181059',
    secondary: '#F5F5F9',
    white: '#FFFFFF',
    dark: '#1A1A1A',
    text: '#757575',
    veryLightPurple: '#ABA3CF',
    purple: '#8645FF',
    yellow: '#FDCA00',
    red: '#F44336',
    green: '#4CD964',
    lightGrey: '#ABABAC',
  },
  constants: {
    screenPadding: 40,
  },
  spacing: {
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
  },
  borderRadii: {
    none: 0,
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
  },
  textVariants: {
    h1: {
      fontSize: 28,
      fontFamily: 'SofiaPro-Bold',
    },
    b1: {
      fontSize: 17,
      fontFamily: 'SofiaPro-Regular',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export default theme;
