import { extendTheme} from "@chakra-ui/react";

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
    }
  }
);