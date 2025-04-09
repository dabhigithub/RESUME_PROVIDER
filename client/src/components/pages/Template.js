import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Box,
  Chip
} from '@mui/material';
import { 
  VisibilityOutlined, 
  FileDownloadOutlined, 
  ArrowForward 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import "../../assets/css/Template.css";
import temp1 from '../../assets/Images/1.svg';
import temp2 from '../../assets/Images/2.svg';
import temp3 from '../../assets/Images/3.jpg';
import temp4 from '../../assets/Images/4.svg';
import temp5 from '../../assets/Images/5.jpg';
import temp6 from '../../assets/Images/6.svg';

const Template = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Template data with more detailed information
  const templates = [
    { 
      id: 1, 
      name: 'Professional Clean',
      src: temp1, 
      description: 'A clean, professional template ideal for corporate positions. Features a well-organized layout with elegant typography.',
      tags: ['Professional', 'Corporate', 'Clean'],
      color: '#2a3b8f'
    },
    { 
      id: 2, 
      name: 'Modern Creative',
      src: temp2, 
      description: 'Modern design with creative elements. Perfect for designers, artists, and creative professionals.',
      tags: ['Creative', 'Modern', 'Artistic'],
      color: '#1f6e8c'
    },
    { 
      id: 3, 
      name: 'Executive Elite',
      src: temp3, 
      description: 'An executive-level template that highlights leadership and professional achievements.',
      tags: ['Executive', 'Leadership', 'Elite'],
      color: '#5d3891'
    },
    { 
      id: 4, 
      name: 'Tech Innovative',
      src: temp4, 
      description: 'Designed specifically for tech roles, with sections for technical skills and project showcases.',
      tags: ['Technical', 'IT', 'Innovative'],
      color: '#26577c'
    },
    { 
      id: 5, 
      name: 'Academic Focus',
      src: temp5, 
      description: 'Academic-focused template with emphasis on educational background and research experience.',
      tags: ['Academic', 'Research', 'Educational'],
      color: '#4b0082'
    },
    { 
      id: 6, 
      name: 'Minimalist Style',
      src: temp6, 
      description: 'Minimalist design that focuses on content with clean spacing and typography.',
      tags: ['Minimalist', 'Simple', 'Clean'],
      color: '#3a4750'
    },
  ];

  const handlePreviewOpen = (template) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  return (
    <div className="template-page">
      <Box sx={{ bgcolor: '#f5f9ff', pt: 6, pb: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 600, color: '#233D7E' }}>
            Resume Templates
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 5, maxWidth: '800px', mx: 'auto' }}>
            Choose from our professionally designed templates to create your perfect resume.
            Each template is fully customizable to match your personal style.
          </Typography>
          
          <Grid container spacing={4}>
            {templates.map((template) => (
              <Grid item key={template.id} xs={12} sm={6} md={4}>
                <Card 
                  className="template-card" 
                  elevation={2}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden', pt: '140%' }}>
                    <CardMedia
                      component="img"
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      image={template.src}
                      alt={template.name}
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        p: 1,
                        background: `linear-gradient(to bottom, ${template.color}dd, transparent)`,
                        color: 'white'
                      }}
                    >
                      <Typography variant="subtitle1" component="h2" fontWeight="bold">
                        {template.name}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {template.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {template.tags.map(tag => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small" 
                          sx={{ 
                            bgcolor: `${template.color}22`, 
                            color: template.color,
                            fontSize: '0.7rem'
                          }} 
                        />
                      ))}
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                    <Button 
                      size="small" 
                      startIcon={<VisibilityOutlined />}
                      onClick={() => handlePreviewOpen(template)}
                    >
                      Preview
                    </Button>
                    <Link to="/template/create" style={{ textDecoration: 'none' }}>
                      <Button 
                        variant="contained" 
                        size="small" 
                        endIcon={<ArrowForward />}
                        sx={{ 
                          bgcolor: template.color,
                          '&:hover': {
                            bgcolor: `${template.color}dd`
                          }
                        }}
                      >
                        Use Template
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth="md"
        fullWidth
      >
        {selectedTemplate && (
          <>
            <DialogTitle sx={{ bgcolor: selectedTemplate.color, color: 'white' }}>
              {selectedTemplate.name} Template
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <img 
                src={selectedTemplate.src} 
                alt={selectedTemplate.name} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
              <Button onClick={handlePreviewClose}>Close</Button>
              <Link to="/template/create" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  startIcon={<FileDownloadOutlined />}
                  sx={{ 
                    bgcolor: selectedTemplate.color,
                    '&:hover': {
                      bgcolor: `${selectedTemplate.color}dd`
                    }
                  }}
                >
                  Use This Template
                </Button>
              </Link>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Template;
