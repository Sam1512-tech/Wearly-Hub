import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

function Navbar({ hideCartIcon = false }) {
  const { currentUser } = useAuth();
  const { totalItems } = useCart();
  const { darkMode, toggleDarkMode } = useAppTheme();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Toolbar sx={{ py: 1 }}>
        {/* Logo - Text Version */}
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            textDecoration: 'none', 
            color: 'inherit',
            mr: 3,
            lineHeight: 1
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'primary.main',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}
          >
            WEARLY HUB
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 300,
              letterSpacing: '0.5px',
              color: 'text.secondary',
              fontSize: '0.7rem',
              mt: -0.5
            }}
          >
            WEAR.STYLE.REPEAT
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{ 
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {!hideCartIcon && (
            <IconButton
              component={Link}
              to="/cart"
              color="inherit"
              sx={{ 
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          )}

          {currentUser ? (
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderRadius: '24px',
                px: 3,
                ml: 2,
                borderColor: darkMode ? '#D67D60' : '#BF4E30',
                color: darkMode ? '#D67D60' : '#BF4E30',
                '&:hover': {
                  borderColor: darkMode ? '#BF4E30' : '#8C2B1A',
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  borderRadius: '24px',
                  px: 3,
                  ml: 2,
                  color: 'text.primary',
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  borderRadius: '24px',
                  px: 3,
                  ml: 1,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;