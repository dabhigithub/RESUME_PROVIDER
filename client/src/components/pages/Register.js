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
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GoogleIcon from '@mui/icons-material/Google';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Personal Info', 'Account Setup'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Agreed to Terms:', agreeToTerms);
  };

  const isStepOneValid = name.trim() !== '' && email.includes('@');
  const isStepTwoValid = password.length >= 6 && password === confirmPassword && agreeToTerms;

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
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
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={handleNext}
              disabled={!isStepOneValid}
              size="large"
              sx={{ 
                py: 1.5,
                mt: 2,
                borderRadius: '8px',
                boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                }
              }}
            >
              Continue
            </Button>
          </>
        );
      case 1:
        return (
          <>
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
              sx={{ mb: 3 }}
              helperText="Password must be at least 6 characters"
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
              error={confirmPassword !== '' && password !== confirmPassword}
              helperText={confirmPassword !== '' && password !== confirmPassword ? "Passwords don't match" : ""}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link component={RouterLink} to="/terms" underline="hover">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link component={RouterLink} to="/privacy" underline="hover">
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleBack}
                size="large"
                sx={{ 
                  py: 1.5,
                  flex: 1,
                  borderRadius: '8px'
                }}
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={!isStepTwoValid}
                size="large"
                sx={{ 
                  py: 1.5,
                  flex: 2,
                  borderRadius: '8px',
                  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                  }
                }}
                endIcon={<HowToRegIcon />}
              >
                Create Account
              </Button>
            </Box>
          </>
        );
      default:
        return 'Unknown step';
    }
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
        {/* Left side - Registration form */}
        <Box sx={{ 
          flex: isMobile ? 1 : '45%',
          p: isMobile ? 3 : 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography variant="h4" fontWeight="700" color="primary" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Get started with your free account today
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleRegister}>
            {getStepContent(activeStep)}
            
            {activeStep === 1 && (
              <>
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
                  Sign up with Google
                </Button>
              </>
            )}
            
            <Box sx={{ textAlign: 'center', mt: activeStep === 0 ? 3 : 0 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" underline="hover" fontWeight="600">
                  Sign In
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
        
        {/* Right side - Image/Decoration */}
        {!isMobile && (
          <Box sx={{ 
            flex: '55%',
            background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
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
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <AppRegistrationIcon sx={{ fontSize: 60 }} />
              </Box>
              <Typography variant="h3" fontWeight="700" gutterBottom>
                Start Your Journey
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 300 }}>
                Join our platform and build professional resumes
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Create stunning resumes, get noticed by employers, and take your career to the next level.
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Register;
