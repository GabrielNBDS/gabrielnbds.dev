import { mode } from '@chakra-ui/theme-tools'

export default {
  colors: {
    lightBackground: '#f5f5f5',
    darkBackground: '#202023',
  },
  global: {
    a: {
      cursor: 'pointer',
    },
  },
  styles: {
    global: props => ({
      body: {
        bg: mode('lightBackground', 'darkBackground')(props),
      },
      a: {
        cursor: 'pointer',
      },
    }),
  },
  components: {
    Heading: {
      variants: {
        'section-title': {
          textDecoration: 'underline',
          fontSize: 20,
          textUnderlineOffset: 6,
          textDecorationColor: '#525252',
          textDecorationThickness: 4,
          marginTop: 3,
          marginBottom: 4,
        },
      },
    },
  },
  config: {
    initialColorMode: 'dark',
  },
  fonts: {
    body: "'Montserrat', sans-serif",
    heading: "'Montserrat', sans-serif",
    mono: "'Montserrat', monospace",
  },
}
