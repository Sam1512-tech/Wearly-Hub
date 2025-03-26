import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Alert,
  Paper,
  useTheme,
  Grid,
  CircularProgress,
  Divider
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../assets/login-hero.avif'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Grid container>
          {/* Image Section */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                height: '100%',
                minHeight: '500px',
                backgroundImage: `url(${LoginImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: 'linear-gradient(135deg, rgba(191,78,48,0.7) 0%, rgba(91,140,90,0.7) 100%)',
                }
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  left: 40,
                  color: 'white',
                  zIndex: 1
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1">
                  Sign in to access your personalized shopping experience
                </Typography>
              </Box>
            </Box>
          </Grid>

          
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 3, md: 6 } }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Sign In
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Don't have an account?{' '}
                <Link href="/signup" color="primary" underline="hover">
                  Create one
                </Link>
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Link href="/forgot-password" color="text.secondary" underline="hover">
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: '8px',
                    mb: 3,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>

                <Divider sx={{ my: 3 }}>OR</Divider>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Sign in with
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      sx={{ borderRadius: '8px', textTransform: 'none' }}
                    >
                      Google
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ borderRadius: '8px', textTransform: 'none' }}
                    >
                      Facebook
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default LoginPage;
