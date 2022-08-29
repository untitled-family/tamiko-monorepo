import { extendTheme } from '@chakra-ui/react';
import { foundations } from './foundation';

const config = {
  cssVarPrefix: 'tamiko',
};

export const theme = extendTheme({
  config,
  ...foundations,
  styles: {
    global: {
      'html, body': {
        // color: 'whiteAlpha.700',
        // bg: 'black.500',
        fontSize: 'md',
      },
      a: {
        color: 'whiteAlpha.500',
      },
    },
  }
});
