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
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import SignupImage from '../assets/signup-hero.avif';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!acceptedTerms) {
      setError('You must accept the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
                minHeight: '600px',
                backgroundImage: `url(${SignupImage})`,
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
                  background: 'linear-gradient(135deg, rgba(91,140,90,0.7) 0%, rgba(191,78,48,0.7) 100%)',
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
                  Join Us
                </Typography>
                <Typography variant="body1">
                  Create an account to unlock exclusive benefits
                </Typography>
              </Box>
            </Box>
          </Grid>

          
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 3, md: 6 } }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Create Account
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Already have an account?{' '}
                <Link href="/login" color="primary" underline="hover">
                  Sign in
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
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  margin="normal"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{' '}
                      <Link href="/terms" color="primary" underline="hover">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" color="primary" underline="hover">
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading || !acceptedTerms}
                  sx={{
                    py: 1.5,
                    borderRadius: '8px',
                    mb: 3,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Or sign up with
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

export default SignupPage;
