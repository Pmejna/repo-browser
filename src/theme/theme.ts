import { extendTheme} from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';


export const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: true,
    },
    breakpoints: {
        sx: "20em",
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    },
    colors: {
        brandPrimary: {
            100: "#55eeff",
            200: "#45ddE6",
            300: "#34ccD5",
            400: "#44aaC4",
            500: "#3388B3",
            600: "#2277A2",
            700: "#226691",
            800: "#215480",
            900: "#21216F",
      },
    },
    components: {
      Button: {
        variants: {
          link: {
            ':focus': {
              outline: 'none',
              boxShadow: 'none',
            }
          },
          button: {
            ':focus': {
                outline: 'none',
                boxShadow: 'none',
            }
          },
        }
      },
      IconButton: {
          variants: {
                link: {
                    ':focus': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                }
          }
      }
    },
    styles: {
      global: (props: any) =>  ({
        'body, html': {
          overflowX: 'hidden',
        },
        '::-webkit-scrollbar': {
          width: '1rem',
          backgroundColor: mode('gray.200', 'whiteAlpha.700')(props),
        },
        /* the buttons on the scrollbar (arrows pointing upwards and downwards). */
        '::-webkit-scrollbar-thumb': {
            backgroundColor: mode('brandPrimary.500', 'brandPrimary.700')(props),
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: mode('brandPrimary.700', 'brandPrimary.500', )(props),
        },
      }),
    }
  }
);