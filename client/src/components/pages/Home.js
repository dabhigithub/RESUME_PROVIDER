import React from "react";
import { Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent,
  Avatar,
  Rating,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  DescriptionOutlined, 
  SpeedOutlined, 
  SettingsOutlined, 
  FormatPaintOutlined, 
  CloudDownloadOutlined,
  ArrowForward
} from '@mui/icons-material';
import HeroImage from "../../assets/Images/Hero.jpg";
import "../../assets/css/Home.css";

const features = [
  {
    icon: <DescriptionOutlined sx={{ fontSize: 40 }} />,
    title: "Professional Templates",
    description: "Choose from dozens of professionally designed templates that meet industry standards and catch employers' attention."
  },
  {
    icon: <SpeedOutlined sx={{ fontSize: 40 }} />,
    title: "Easy & Fast",
    description: "Our intuitive interface makes resume creation quick and simple. Build your resume in just minutes, not hours."
  },
  {
    icon: <FormatPaintOutlined sx={{ fontSize: 40 }} />,
    title: "Customizable Designs",
    description: "Personalize your resume with custom colors, fonts, and layouts to match your personal brand and style."
  },
  {
    icon: <SettingsOutlined sx={{ fontSize: 40 }} />,
    title: "ATS-Friendly",
    description: "Our resumes are optimized for Applicant Tracking Systems, ensuring your resume gets past digital filters."
  },
  {
    icon: <CloudDownloadOutlined sx={{ fontSize: 40 }} />,
    title: "Multiple Formats",
    description: "Download your resume in multiple formats including PDF, DOCX, and TXT to suit any application requirement."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    text: "Using this resume provider helped me land interviews at top companies. The templates are professional and easy to customize!"
  },
  {
    name: "David Chen",
    role: "Software Developer",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 5,
    text: "As a developer, I was impressed with how clean and professional my resume looked. Got 3 interviews within a week of sending it out!"
  },
  {
    name: "Priya Patel",
    role: "Financial Analyst",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    rating: 4,
    text: "The ATS-friendly templates really made a difference. I started getting responses after switching to a resume I made with this tool."
  }
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? "h3" : "h2"} 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  color: '#1a237e'
                }}
              >
                Build Your Professional Resume in Minutes
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  color: '#455a64',
                  lineHeight: 1.6
                }}
              >
                Our resume provider takes the hassle out of resume writing. Stand out with professional templates and land your dream job.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  component={Link}
                  to="/template"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)'
                  }}
                >
                  Create Resume
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  component={Link}
                  to="/contact"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    borderWidth: 2
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    bottom: -20,
                    left: -20,
                    border: '2px solid #1a237e',
                    borderRadius: 2,
                    zIndex: -1
                  }
                }}
              >
                <img 
                  src={HeroImage} 
                  alt="Resume Provider" 
                  style={{ 
                    width: '100%',
                    borderRadius: 8,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 2,
              fontWeight: 700,
              color: '#1a237e'
            }}
          >
            Why Choose Our Resume Provider?
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#455a64',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Create professional resumes in minutes with features designed to help you stand out
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4,
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      color: '#1a237e',
                      mb: 2
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#455a64',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: '#f5f7fa' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 2,
              fontWeight: 700,
              color: '#1a237e'
            }}
          >
            What Our Users Say
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#455a64',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Success stories from job seekers who built their resumes with our platform
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Rating 
                      value={testimonial.rating} 
                      readOnly 
                      sx={{ 
                        mb: 3,
                        color: '#ffd700'
                      }} 
                    />
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        mb: 3,
                        fontStyle: 'italic',
                        color: '#455a64',
                        lineHeight: 1.6
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        sx={{ 
                          width: 56, 
                          height: 56,
                          mr: 2
                        }}
                      />
                      <Box>
                        <Typography 
                          variant="subtitle1" 
                          component="h4"
                          sx={{ 
                            fontWeight: 600,
                            color: '#1a237e'
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#455a64'
                          }}
                        >
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, bgcolor: '#fff' }}>
        <Container maxWidth="md">
          <Paper 
            elevation={0}
            sx={{ 
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
              color: '#fff',
              borderRadius: 4
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 2,
                fontWeight: 700
              }}
            >
              Ready to create your professional resume?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                opacity: 0.9
              }}
            >
              Join thousands of job seekers who have successfully landed their dream jobs
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              to="/template"
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                bgcolor: '#fff',
                color: '#1a237e',
                '&:hover': {
                  bgcolor: '#f5f5f5'
                }
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;