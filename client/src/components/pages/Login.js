import React, { useState } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box, 
  Container,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="lg" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 4,
      background: 'linear-gradient(to right bottom, #f7f9fc, #dce7f5)'
    }}>
      <Paper elevation={isMobile ? 1 : 8} sx={{ 
        width: '100%',
        maxWidth: '1000px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        borderRadius: '16px',
      }}>
        {/* Left side - Login form */}
        <Box sx={{ 
          flex: isMobile ? 1 : '45%',
          p: isMobile ? 3 : 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography variant="h4" fontWeight="700" color="primary" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Enter your credentials to access your account
          </Typography>
          
          <form onSubmit={handleLogin}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Link component={RouterLink} to="/forgot-password" underline="hover" variant="body2">
                Forgot Password?
              </Link>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              type="submit"
              size="large"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              sx={{ 
                py: 1.5,
                mb: 3,
                borderRadius: '8px',
                boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                }
              }}
              endIcon={<LoginIcon />}
            >
              Sign In
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
            
            <Button 
              variant="outlined" 
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{ 
                py: 1.5,
                borderRadius: '8px',
                mb: 3
              }}
            >
              Continue with Google
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register" underline="hover" fontWeight="600">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
        
        {/* Right side - Image/Decoration */}
        {!isMobile && (
          <Box sx={{ 
            flex: '55%',
            background: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            p: 6,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
              top: '-25%',
              left: '-25%',
              zIndex: 1
            }} />
            <Box sx={{ zIndex: 2, textAlign: 'center', maxWidth: '80%' }}>
              <Typography variant="h3" fontWeight="700" gutterBottom>
                Resume Provider
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 300 }}>
                Create and manage professional resumes with ease
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Join thousands of job seekers who have successfully landed their dream jobs with our resume tools.
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
