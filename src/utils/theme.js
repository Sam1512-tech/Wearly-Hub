import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#BF4E30', // Terracotta
      light: '#D67D60',
      dark: '#8C2B1A',
    },
    secondary: {
      main: '#5B8C5A', // Forest green
      light: '#7FB07E',
      dark: '#3A6A39',
    },
    background: {
      default: '#F8F4E9', // Soft beige
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C', // Dark charcoal
      secondary: '#5E5E5E',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          padding: '10px 24px',
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          color: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2C2C2C',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D67D60', // Lighter terracotta
      light: '#E8A58B',
      dark: '#BF4E30',
    },
    secondary: {
      main: '#7FB07E', // Sage green
      light: '#9FC89E',
      dark: '#5B8C5A',
    },
    background: {
      default: 'rgb(102, 102, 101)', // Your specified gray
      paper: '#2D2D2D',
    },
    text: {
      primary: '#FFFFFF', // Pure white for better contrast
      secondary: '#E0E0E0', // Slightly dimmed white
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          padding: '10px 24px',
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #2D2D2D 0%, #252525 100%)',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #252525 0%, #1A1A1A 100%)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          color: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2D2D2D',
        },
      },
    },
  },
});