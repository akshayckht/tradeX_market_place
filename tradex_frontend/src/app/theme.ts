import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  // Generate CSS variables for theme switching
  cssVariables: {
    colorSchemeSelector: 'class',
  },

  // Light and dark color schemes
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#2563EB',
          light: '#60A5FA',
          dark: '#1D4ED8',
          contrastText: '#FFFFFF',
        },

        secondary: {
          main: '#0F766E',
          contrastText: '#FFFFFF',
        },

        background: {
          default: '#F8FAFC',
          paper: '#FFFFFF',
        },

        text: {
          primary: '#172554',
          secondary: '#64748B',
        },

        divider: '#E2E8F0',

        success: {
          main: '#16A34A',
        },

        error: {
          main: '#DC2626',
        },

        warning: {
          main: '#D97706',
        },

        info: {
          main: '#0284C7',
        },
      },
    },

    dark: {
      palette: {
        primary: {
          main: '#60A5FA',
          light: '#93C5FD',
          dark: '#2563EB',
          contrastText: '#0B1220',
        },

        secondary: {
          main: '#5EEAD4',
          contrastText: '#0B1220',
        },

        background: {
          default: '#0B1220',
          paper: '#111827',
        },

        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
        },

        divider: '#334155',

        success: {
          main: '#4ADE80',
        },

        error: {
          main: '#F87171',
        },

        warning: {
          main: '#FBBF24',
        },

        info: {
          main: '#38BDF8',
        },
      },
    },
  },

  // Common typography
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 600,
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  // Common component shape
  shape: {
    borderRadius: 10,
  },

  // Component-level customizations
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'medium',
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})
