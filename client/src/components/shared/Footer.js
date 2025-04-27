import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link, Divider } from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import './Footer.css';
import Logo from "../../assets/Images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box className="footer" component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Box className="footer-brand">
              <div className="logo-container">
                <img src={Logo} alt="Resume Provider Logo" className="footer-logo" />
              </div>
              <Typography variant="h6" className="company-name">
                Resume Provider
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Create professional resumes in minutes with our easy-to-use provider.
                Stand out from the crowd with modern templates.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">
              Quick Links
            </Typography>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/template">Templates</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" className="footer-heading">
              Follow Us
            </Typography>
            <Box className="social-icons">
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Subscribe to our newsletter for tips on creating the perfect resume.
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box className="footer-bottom">
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} Resume Provider. All rights reserved.
          </Typography>
          <Box className="footer-legal-links">
            <Link href="#" underline="hover">Privacy Policy</Link>
            <Link href="#" underline="hover">Terms of Service</Link>
            <Link href="#" underline="hover">Cookies Policy</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 