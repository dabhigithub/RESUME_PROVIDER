// About.js

import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  DescriptionOutlined,
  SpeedOutlined,
  FormatPaintOutlined,
  CloudDownloadOutlined,
  PeopleAltOutlined,
  EmojiEventsOutlined
} from '@mui/icons-material';
import "../../assets/css/About.css";
import AbhishekImage from "../../assets/Images/Abhishek.jpg";
import AdityaImage from "../../assets/Images/Aditya.jpg";
import AmitImage from "../../assets/Images/amit.jpg";

const teamMembers = [
  {
    name: "Abhishek Kumar",
    role: "CEO & Founder",
    avatar: AbhishekImage,
    bio: "With over 15 years of experience in HR and recruitment, Abhishek founded Resume Provider to help job seekers create professional resumes that stand out."
  },
  {
    name: "Aditya Raj",
    role: "Lead Developer",
    avatar: AdityaImage,
    bio: "Aditya brings his expertise in web development and user experience to create intuitive and powerful resume building tools."
  },
  {
    name: "Amit Kumar",
    role: "Design Director",
    avatar: AmitImage,
    bio: "Amit's background in graphic design and typography ensures our templates are both beautiful and professional."
  }
];

const stats = [
  { number: "50K+", label: "Resumes Created", icon: <DescriptionOutlined sx={{ fontSize: 40 }} /> },
  { number: "95%", label: "Success Rate", icon: <EmojiEventsOutlined sx={{ fontSize: 40 }} /> },
  { number: "24/7", label: "Support", icon: <PeopleAltOutlined sx={{ fontSize: 40 }} /> },
  { number: "100+", label: "Templates", icon: <FormatPaintOutlined sx={{ fontSize: 40 }} /> }
];

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: 8, bgcolor: '#f5f7fa' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
          color: '#fff',
          py: 8,
          mb: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: 'center'
            }}
          >
            About Resume Provider
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            We're on a mission to help job seekers create professional resumes that get noticed by employers.
            Our platform combines modern design with industry best practices to help you land your dream job.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              color: '#1a237e',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Our Mission
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: '#fff',
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: '#1a237e' }}>
                  Empowering Job Seekers
                </Typography>
                <Typography variant="body1" sx={{ color: '#455a64', lineHeight: 1.6 }}>
                  We believe that everyone deserves the opportunity to present their skills and experience in the best possible way. Our platform makes it easy to create professional resumes that highlight your unique strengths and achievements.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: '#fff',
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: '#1a237e' }}>
                  Innovation in Resume Building
                </Typography>
                <Typography variant="body1" sx={{ color: '#455a64', lineHeight: 1.6 }}>
                  We're constantly innovating to provide the best tools and templates for creating resumes. Our platform combines modern design principles with industry best practices to help you stand out in a competitive job market.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    bgcolor: '#fff',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box sx={{ color: '#1a237e', mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#455a64' }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              color: '#1a237e',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: '#fff',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        border: '4px solid #1a237e'
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a237e' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#455a64', mb: 2 }}>
                      {member.role}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#455a64', lineHeight: 1.6 }}>
                    {member.bio}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
