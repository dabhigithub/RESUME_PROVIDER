import React, { useState, useEffect, useRef } from "react";
import { 
  TextField, 
  Button, 
  Grid, 
  Container, 
  Box, 
  Paper, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Divider,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Alert,
  Fade,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  FormControlLabel,
  Menu,
  ListItemIcon,
  ListItemText,
  Link
} from "@mui/material";
import { 
  ArrowForward, 
  ArrowBack, 
  Add as AddIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  LocalOffer as SkillIcon,
  FormatQuote as SummaryIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  LinkedIn as LinkedInIcon,
  Language as WebsiteIcon,
  Title as TitleIcon,
  LocationOn as LocationIcon,
  CorporateFare as IndustryIcon,
  PermIdentity as ProfilePhotoIcon,
  PictureAsPdf as PdfIcon,
  Description as DocxIcon,
  TextSnippet as TxtIcon,
  Visibility as VisibilityOutlined
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

const CreateResume = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showFinalPreview, setShowFinalPreview] = useState(false); // Renamed for clarity
  const [showTemplatePreview, setShowTemplatePreview] = useState(false); // New state for template preview
  const [previewTemplate, setPreviewTemplate] = useState(null); // Store which template to preview
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);
  const resumeRef = useRef(null);
  
  // Template options
  const templates = [
    { id: 'modern', name: 'Modern', primaryColor: '#2c3e50', accentColor: '#3498db' },
    { id: 'professional', name: 'Professional', primaryColor: '#34495e', accentColor: '#2ecc71' },
    { id: 'creative', name: 'Creative', primaryColor: '#8e44ad', accentColor: '#f1c40f' },
    { id: 'minimal', name: 'Minimal', primaryColor: '#2c3e50', accentColor: '#7f8c8d' },
  ];
  
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    linkedin: "",
    website: "",
    objective: "",
    education: [{ institute: "", degree: "", year: "", grade: "", location: "", description: "" }],
    experience: [{ company: "", position: "", duration: "", location: "", description: "" }],
    skills: [""],
    languages: [{ name: "", proficiency: "Beginner" }],
    certifications: [{ name: "", issuer: "", date: "", description: "" }],
    projects: [{ name: "", technologies: "", duration: "", url: "", description: "" }],
    showProfilePhoto: false,
    profilePhoto: "",
    selectedTemplate: 'modern'
  });

  // Steps for the stepper
  const steps = [
    'Personal Information',
    'Education',
    'Work Experience',
    'Skills',
    'Projects',
    'Certificates',
    'Templates & Finalize'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({
      ...formData,
      education: newEducation
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    setFormData({
      ...formData,
      experience: newExperience
    });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institute: "", degree: "", year: "", grade: "", location: "", description: "" }]
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", position: "", duration: "", location: "", description: "" }]
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""]
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({
      ...formData,
      education: newEducation
    });
  };

  const removeExperience = (index) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    setFormData({
      ...formData,
      experience: newExperience
    });
  };

  const removeSkill = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { name: "", proficiency: "Beginner" }]
    });
  };

  const removeLanguage = (index) => {
    const newLanguages = [...formData.languages];
    newLanguages.splice(index, 1);
    setFormData({
      ...formData,
      languages: newLanguages
    });
  };

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index][field] = value;
    setFormData({
      ...formData,
      languages: newLanguages
    });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, { name: "", issuer: "", date: "", description: "" }]
    });
  };

  const removeCertification = (index) => {
    const newCertifications = [...formData.certifications];
    newCertifications.splice(index, 1);
    setFormData({
      ...formData,
      certifications: newCertifications
    });
  };

  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index][field] = value;
    setFormData({
      ...formData,
      certifications: newCertifications
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSuccessMessage(true);
    setShowFinalPreview(true); // Renamed 
    
    // Hide the success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage(false);
    }, 5000);
  };

  const handleCloseFinalPreview = () => {
    setShowFinalPreview(false);
  };

  const openTemplatePreview = (templateId) => {
    setPreviewTemplate(templateId);
    setShowTemplatePreview(true);
  };

  const closeTemplatePreview = () => {
    setShowTemplatePreview(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenDownloadMenu = (event) => {
    setDownloadAnchorEl(event.currentTarget);
  };

  const handleCloseDownloadMenu = () => {
    setDownloadAnchorEl(null);
  };

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;
    
    // Show loading message
    alert("Generating PDF... Please wait.");

    // Use html2canvas to capture the resume as an image
    html2canvas(resumeRef.current, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calculate dimensions to fit the resume in A4
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${formData.fullName || 'Resume'}.pdf`);
      
      handleCloseDownloadMenu();
    });
  };

  const handleDownloadDOCX = () => {
    if (!resumeRef.current) return;
    
    // This is a simplified approach - in a production app, you'd use a proper DOCX library
    // For demo purposes, we'll create an HTML blob that Word can open
    const resumeContent = resumeRef.current.innerHTML;
    
    // Create a simplified HTML document that Word can open
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${formData.fullName || 'Resume'}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Calibri', 'Arial', sans-serif; }
        </style>
      </head>
      <body>
        ${resumeContent}
      </body>
      </html>
    `;
    
    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-word' });
    saveAs(blob, `${formData.fullName || 'Resume'}.docx`);
    
    handleCloseDownloadMenu();
  };

  const handleDownloadTXT = () => {
    if (!resumeRef.current) return;
    
    // Create a text version of the resume
    const name = formData.fullName || 'Your Name';
    const title = formData.jobTitle || 'Professional Title';
    const contact = `${formData.email || ''} | ${formData.phone || ''} | ${formData.address || ''}`;
    
    let txtContent = `${name.toUpperCase()}\n`;
    txtContent += `${title}\n`;
    txtContent += `${contact}\n\n`;
    
    if (formData.objective) {
      txtContent += "PROFESSIONAL SUMMARY\n";
      txtContent += "==================\n";
      txtContent += `${formData.objective}\n\n`;
    }
    
    if (formData.education.length > 0 && formData.education.some(edu => edu.institute)) {
      txtContent += "EDUCATION\n";
      txtContent += "=========\n";
      formData.education.forEach(edu => {
        if (edu.institute) {
          txtContent += `${edu.institute}\n`;
          txtContent += `${edu.degree}${edu.year ? ` (${edu.year})` : ''}\n`;
          if (edu.grade) txtContent += `Grade: ${edu.grade}\n`;
          txtContent += "\n";
        }
      });
    }
    
    if (formData.experience.length > 0 && formData.experience.some(exp => exp.company)) {
      txtContent += "WORK EXPERIENCE\n";
      txtContent += "===============\n";
      formData.experience.forEach(exp => {
        if (exp.company) {
          txtContent += `${exp.company}\n`;
          txtContent += `${exp.position}${exp.duration ? ` (${exp.duration})` : ''}\n`;
          if (exp.description) txtContent += `${exp.description}\n`;
          txtContent += "\n";
        }
      });
    }
    
    if (formData.projects.length > 0 && formData.projects.some(project => project.name)) {
      txtContent += "PROJECTS\n";
      txtContent += "========\n";
      formData.projects.forEach(project => {
        if (project.name) {
          txtContent += `${project.name}${project.duration ? ` (${project.duration})` : ''}\n`;
          if (project.technologies) txtContent += `Technologies: ${project.technologies}\n`;
          if (project.description) txtContent += `${project.description}\n`;
          if (project.url) txtContent += `URL: ${project.url}\n`;
          txtContent += "\n";
        }
      });
    }
    
    if (formData.certifications.length > 0 && formData.certifications.some(cert => cert.name)) {
      txtContent += "CERTIFICATIONS\n";
      txtContent += "==============\n";
      formData.certifications.forEach(cert => {
        if (cert.name) {
          txtContent += `${cert.name}${cert.date ? ` (${cert.date})` : ''}\n`;
          txtContent += `Issuer: ${cert.issuer}\n`;
          if (cert.description) txtContent += `${cert.description}\n`;
          txtContent += "\n";
        }
      });
    }
    
    if (formData.skills.length > 0 && formData.skills.some(skill => skill.trim() !== "")) {
      txtContent += "SKILLS\n";
      txtContent += "======\n";
      formData.skills.forEach(skill => {
        if (skill.trim() !== "") {
          txtContent += `• ${skill}\n`;
        }
      });
    }
    
    // Create blob and download
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${formData.fullName || 'Resume'}.txt`);
    
    handleCloseDownloadMenu();
  };

  const handleShareResume = () => {
    // Implementation for sharing resume
    alert("Share functionality would be implemented here");
  };

  // Add a function to handle saving the resume
  const handleSaveResume = () => {
    // In a real implementation, this would save the resume to a database
    alert("Resume saved successfully! In a complete implementation, this would save the resume to your account.");
    handleCloseFinalPreview();
  };

  // Check if current step is valid
  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.fullName && formData.email && formData.phone;
      case 1:
        return formData.education.every(edu => edu.institute && edu.degree);
      case 2:
        return formData.experience.every(exp => exp.company && exp.position);
      case 3:
        return formData.skills.some(skill => skill.trim() !== "");
      case 4:
        return formData.projects.length > 0 && formData.projects.every(project => project.name);
      case 5:
        return formData.certifications.length > 0 && formData.certifications.every(cert => cert.name && cert.issuer);
      case 6:
        return true; // Template selection is always valid
      default:
        return true;
    }
  };

  // Render the template selection options
  const renderTemplateSelection = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SummaryIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" color="primary">Template Options</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Choose a template style for your resume:
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {templates.map((template) => (
              <Grid item xs={6} sm={3} key={template.id}>
                <Card 
                  variant={formData.selectedTemplate === template.id ? "elevation" : "outlined"}
                  elevation={formData.selectedTemplate === template.id ? 8 : 0}
                  onClick={() => setFormData({...formData, selectedTemplate: template.id})}
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    borderColor: formData.selectedTemplate === template.id ? template.accentColor : 'divider',
                    borderWidth: formData.selectedTemplate === template.id ? 2 : 1,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      height: 100, 
                      bgcolor: template.primaryColor,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      p: 2
                    }}
                  >
                    <Typography variant="subtitle1" align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {template.name}
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {formData.selectedTemplate === template.id && (
                        <CheckCircleIcon color="success" />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  // Add template selection to step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Personal Details</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
            </Grid>
            
            {/* First Row - Main Details */}
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                variant="outlined"
                placeholder="e.g., Senior Software Engineer"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            {/* Second Row - Contact Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            {/* Third Row - Location Information */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <LocationIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="primary">
                  Location Information
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            
            {/* Fourth Row - Online Presence */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <WebsiteIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="primary">
                  Online Presence
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                variant="outlined"
                placeholder="linkedin.com/in/yourprofile"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website/Portfolio"
                name="website"
                value={formData.website}
                onChange={handleChange}
                variant="outlined"
                placeholder="yourwebsite.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WebsiteIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            {/* Fifth Row - Profile Photo */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ProfilePhotoIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" color="primary">
                    Profile Photo
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.showProfilePhoto}
                      onChange={(e) => setFormData({...formData, showProfilePhoto: e.target.checked})}
                      color="primary"
                    />
                  }
                  label="Include photo in resume"
                />
              </Box>
            </Grid>
            {formData.showProfilePhoto && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Photo URL"
                  name="profilePhoto"
                  value={formData.profilePhoto}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="https://example.com/your-photo.jpg"
                  helperText="Enter the URL of your professional photo"
                />
              </Grid>
            )}
            
            {/* Sixth Row - Professional Summary */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <SummaryIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="primary">
                  Professional Summary
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Professional Summary"
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                variant="outlined"
                placeholder="Write a brief summary of your professional background and career goals"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                      <SummaryIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                * Required fields
              </Typography>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">Education</Typography>
              </Box>
              <Tooltip title="Add Education">
              <Button 
                startIcon={<AddIcon />} 
                onClick={addEducation} 
                  variant="contained" 
                color="primary"
                size="small"
                  sx={{ borderRadius: '20px' }}
              >
                Add Education
              </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            {formData.education.map((edu, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 3, 
                    position: 'relative',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ pb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        Education #{index + 1}
                      </Typography>
                    {formData.education.length > 1 && (
                        <Tooltip title="Remove">
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => removeEducation(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                        </Tooltip>
                    )}
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Institution"
                          value={edu.institute}
                          onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Degree"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Year"
                          value={edu.year}
                          onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                          variant="outlined"
                          placeholder="e.g., 2018-2022"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Grade/GPA"
                          value={edu.grade}
                          onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">Work Experience</Typography>
              </Box>
              <Tooltip title="Add Experience">
              <Button 
                startIcon={<AddIcon />} 
                onClick={addExperience} 
                  variant="contained" 
                color="primary"
                size="small"
                  sx={{ borderRadius: '20px' }}
              >
                Add Experience
              </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            {formData.experience.map((exp, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 3, 
                    position: 'relative',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ pb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        Experience #{index + 1}
                      </Typography>
                    {formData.experience.length > 1 && (
                        <Tooltip title="Remove">
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => removeExperience(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                        </Tooltip>
                    )}
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Company"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Position"
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Duration"
                          value={exp.duration}
                          onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                          variant="outlined"
                          placeholder="e.g., Jan 2020 - Present"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Job Description"
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          variant="outlined"
                          placeholder="Describe your responsibilities and achievements"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SkillIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">Skills</Typography>
              </Box>
              <Tooltip title="Add Skill">
              <Button 
                startIcon={<AddIcon />} 
                onClick={addSkill} 
                  variant="contained" 
                color="primary"
                size="small"
                  sx={{ borderRadius: '20px' }}
              >
                Add Skill
              </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3, 
                  borderRadius: '12px',
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  minHeight: '100px',
                  alignItems: 'flex-start',
                  alignContent: 'flex-start',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                }}
              >
                {formData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={
                      <TextField
                        size="small"
                        variant="standard"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        InputProps={{ disableUnderline: true }}
                        placeholder="Enter skill"
                        sx={{ width: '100px' }}
                      />
                    }
                    onDelete={() => formData.skills.length > 1 && removeSkill(index)}
                    sx={{ 
                      m: 0.5, 
                      height: 'auto', 
                      p: 0.5,
                      bgcolor: theme.palette.background.paper,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    avatar={<Avatar sx={{ bgcolor: theme.palette.primary.main }}><SkillIcon fontSize="small" /></Avatar>}
                  />
                ))}
              </Paper>
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Projects</Typography>
              </Box>
              <Tooltip title="Add Project">
                <Button 
                  startIcon={<AddIcon />} 
                  onClick={addProject} 
                  variant="contained" 
                  color="primary"
                  size="small"
                  sx={{ borderRadius: '20px' }}
                >
                  Add Project
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            {formData.projects.map((project, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 3, 
                    position: 'relative',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ pb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        Project #{index + 1}
                      </Typography>
                      {formData.projects.length > 1 && (
                        <Tooltip title="Remove">
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => removeProject(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Project Name"
                          value={project.name}
                          onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Technologies Used"
                          value={project.technologies}
                          onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                          variant="outlined"
                          placeholder="e.g., React, Node.js, AWS"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Duration"
                          value={project.duration}
                          onChange={(e) => handleProjectChange(index, 'duration', e.target.value)}
                          variant="outlined"
                          placeholder="e.g., Jan 2023 - Mar 2023"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Project URL"
                          value={project.url}
                          onChange={(e) => handleProjectChange(index, 'url', e.target.value)}
                          variant="outlined"
                          placeholder="https://project-url.com"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Project Description"
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                          variant="outlined"
                          placeholder="Describe your project, its purpose, and your contributions"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case 5:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Certificates</Typography>
              </Box>
              <Tooltip title="Add Certificate">
                <Button 
                  startIcon={<AddIcon />} 
                  onClick={addCertification} 
                  variant="contained" 
                  color="primary"
                  size="small"
                  sx={{ borderRadius: '20px' }}
                >
                  Add Certificate
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            {formData.certifications.map((cert, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 3, 
                    position: 'relative',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ pb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        Certificate #{index + 1}
                      </Typography>
                      {formData.certifications.length > 1 && (
                        <Tooltip title="Remove">
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => removeCertification(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Certificate Name"
                          value={cert.name}
                          onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Issuing Organization"
                          value={cert.issuer}
                          onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Date"
                          value={cert.date}
                          onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                          variant="outlined"
                          placeholder="e.g., May 2023"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Credential ID"
                          value={cert.credentialId || ""}
                          onChange={(e) => handleCertificationChange(index, 'credentialId', e.target.value)}
                          variant="outlined"
                          placeholder="e.g., ABC123XYZ"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          label="Description"
                          value={cert.description}
                          onChange={(e) => handleCertificationChange(index, 'description', e.target.value)}
                          variant="outlined"
                          placeholder="Brief description of the certification or skills acquired"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case 6:
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SummaryIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">Template Style</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Choose a template style for your resume:
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {templates.map((template) => (
                    <Grid item xs={6} sm={3} key={template.id}>
                      <Card 
                        variant={formData.selectedTemplate === template.id ? "elevation" : "outlined"}
                        elevation={formData.selectedTemplate === template.id ? 8 : 0}
                        onClick={() => setFormData({...formData, selectedTemplate: template.id})}
                        sx={{
                          cursor: 'pointer',
                          height: '100%',
                          borderColor: formData.selectedTemplate === template.id ? template.accentColor : 'divider',
                          borderWidth: formData.selectedTemplate === template.id ? 2 : 1,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 3
                          }
                        }}
                      >
                        <Box 
                          sx={{ 
                            height: 100, 
                            bgcolor: template.primaryColor,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            p: 2
                          }}
                        >
                          <Typography variant="subtitle1" align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {template.name}
                          </Typography>
                        </Box>
                        <CardContent sx={{ p: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {formData.selectedTemplate === template.id && (
                              <CheckCircleIcon color="success" />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Template Preview Section */}
            <Grid item xs={12} sx={{ mt: 4 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Preview of {templates.find(t => t.id === formData.selectedTemplate)?.name || 'Modern'} Template:
                </Typography>
                <Paper 
                  elevation={0} 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    mt: 2, 
                    borderRadius: '8px', 
                    maxHeight: '500px',
                    overflow: 'auto',
                    border: '1px solid rgba(0,0,0,0.1)',
                    bgcolor: '#fff',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
                  }}
                >
                  {/* Template Preview Content */}
                  {formData.selectedTemplate === 'modern' && (
                    <Box className="modern-template-preview" sx={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
                      {/* Header */}
                      <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2c3e50' }}>
                          John Doe
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: '#3498db', mb: 1 }}>
                          Software Developer
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                            <Typography variant="body2">johndoe@email.com</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                            <Typography variant="body2">(123) 456-7890</Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Section Example */}
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            mb: 1, 
                            pb: 1, 
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main
                          }}
                        >
                          EDUCATION
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              University Name
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              2018-2022
                            </Typography>
                          </Box>
                          <Typography variant="body1">
                            Bachelor of Science in Computer Science
                          </Typography>
                        </Box>
                      </Box>

                      {/* Skills Example */}
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            mb: 1, 
                            pb: 1, 
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main
                          }}
                        >
                          SKILLS
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {["JavaScript", "React", "Node.js", "CSS"].map((skill, index) => (
                            <Chip 
                              key={index} 
                              label={skill} 
                              sx={{ 
                                m: 0.5, 
                                bgcolor: theme.palette.primary.light + '20',
                                color: theme.palette.primary.dark,
                                fontWeight: 500
                              }} 
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Projects */}
                      {formData.projects.length > 0 && formData.projects.some(project => project.name) && (
                        <Box sx={{ mb: 4 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              mb: 2, 
                              pb: 1, 
                              borderBottom: `2px solid ${theme.palette.primary.main}`,
                              color: theme.palette.primary.main
                            }}
                          >
                            PROJECTS
                          </Typography>
                          {formData.projects.map((project, index) => (
                            project.name && (
                              <Box key={index} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {project.name}
                                  </Typography>
                                  {project.duration && (
                                    <Typography variant="body2" color="text.secondary">
                                      {project.duration}
                                    </Typography>
                                  )}
                                </Box>
                                {project.technologies && (
                                  <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 0.5 }}>
                                    Technologies: {project.technologies}
                                  </Typography>
                                )}
                                {project.description && (
                                  <Typography variant="body2">
                                    {project.description}
                                  </Typography>
                                )}
                                {project.url && (
                                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    <Link href={project.url} target="_blank" rel="noopener" sx={{ color: theme.palette.primary.main }}>
                                      View Project
                                    </Link>
                                  </Typography>
                                )}
                              </Box>
                            )
                          ))}
                        </Box>
                      )}

                      {/* Certifications */}
                      {formData.certifications.length > 0 && formData.certifications.some(cert => cert.name) && (
                        <Box sx={{ mb: 4 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              mb: 2, 
                              pb: 1, 
                              borderBottom: `2px solid ${theme.palette.primary.main}`,
                              color: theme.palette.primary.main
                            }}
                          >
                            CERTIFICATIONS
                          </Typography>
                          {formData.certifications.map((cert, index) => (
                            cert.name && (
                              <Box key={index} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {cert.name}
                                  </Typography>
                                  {cert.date && (
                                    <Typography variant="body2" color="text.secondary">
                                      {cert.date}
                                    </Typography>
                                  )}
                                </Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {cert.issuer}
                                </Typography>
                                {cert.description && (
                                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    {cert.description}
                                  </Typography>
                                )}
                              </Box>
                            )
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}

                  {formData.selectedTemplate === 'professional' && (
                    <Box className="professional-template-preview" sx={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
                      {/* Professional Template Preview */}
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' }, 
                        mb: 3,
                        pb: 2,
                        borderBottom: '1px solid #ddd'
                      }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#34495e' }}>
                            Jane Smith
                          </Typography>
                          <Typography variant="subtitle2" sx={{ color: '#2ecc71', mb: 1 }}>
                            Marketing Manager
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center',
                          alignItems: { xs: 'flex-start', sm: 'flex-end' }
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <EmailIcon fontSize="small" sx={{ mr: 0.5, color: '#34495e' }} />
                            <Typography variant="body2">jane.smith@email.com</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: '#34495e' }} />
                            <Typography variant="body2">(987) 654-3210</Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            mb: 1, 
                            color: '#34495e',
                            borderLeft: '4px solid #2ecc71',
                            pl: 2
                          }}
                        >
                          EXPERIENCE
                        </Typography>
                        <Box sx={{ mb: 2, pl: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              Company Name
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              2019-Present
                            </Typography>
                          </Box>
                          <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                            Senior Marketing Specialist
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {formData.selectedTemplate === 'creative' && (
                    <Box className="creative-template-preview" sx={{ transform: 'scale(0.8)', transformOrigin: 'top center', color: '#333' }}>
                      <Box sx={{ 
                        background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
                        color: 'white',
                        p: 3,
                        borderRadius: '8px',
                        mb: 3
                      }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          Alex Johnson
                        </Typography>
                        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                          Graphic Designer
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 1, 
                        mb: 3, 
                        justifyContent: 'center'
                      }}>
                        <Chip 
                          icon={<EmailIcon />} 
                          label="alex@designer.com"
                          sx={{ bgcolor: '#f1c40f', color: '#333' }}
                        />
                        <Chip 
                          icon={<PhoneIcon />} 
                          label="(555) 123-4567"
                          sx={{ bgcolor: '#f1c40f', color: '#333' }}
                        />
                      </Box>

                      <Box sx={{ mb: 3, px: 2 }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          mb: 2,
                          color: '#8e44ad',
                          textAlign: 'center',
                          position: 'relative',
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: '50%',
                            width: '60px',
                            height: '3px',
                            bgcolor: '#f1c40f',
                            transform: 'translateX(-50%)'
                          }
                        }}>
                          SKILLS & EXPERTISE
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                          {["Photoshop", "Illustrator", "UI/UX", "Figma"].map((skill, index) => (
                            <Chip 
                              key={index} 
                              label={skill} 
                              sx={{ 
                                m: 0.5, 
                                bgcolor: 'rgba(241, 196, 15, 0.2)',
                                color: '#8e44ad',
                                fontWeight: 500,
                                borderRadius: '4px'
                              }} 
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {formData.selectedTemplate === 'minimal' && (
                    <Box className="minimal-template-preview" sx={{ transform: 'scale(0.8)', transformOrigin: 'top center', color: '#2c3e50' }}>
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" sx={{ fontWeight: 300, mb: 1, letterSpacing: 1 }}>
                          Michael Brown
                        </Typography>
                        <Divider sx={{ width: '60px', mx: 'auto', mb: 2, borderColor: '#7f8c8d' }} />
                        <Typography variant="subtitle2" sx={{ color: '#7f8c8d' }}>
                          Project Manager
                        </Typography>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          gap: 3,
                          mt: 1,
                          color: '#7f8c8d',
                          fontSize: '0.9rem'
                        }}>
                          <Typography variant="body2">michael@email.com</Typography>
                          <Typography variant="body2">(555) 987-6543</Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 300, 
                          mb: 2,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: 2,
                          color: '#2c3e50'
                        }}>
                          Experience
                        </Typography>
                        <Divider sx={{ width: '30px', mx: 'auto', mb: 2, borderColor: '#7f8c8d' }} />
                        
                        <Box sx={{ mb: 2, textAlign: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            Tech Solutions Inc.
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 400 }}>
                            Senior Project Manager
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            2020 - Present
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">Review Your Resume</Typography>
                </Box>
              <Divider sx={{ mb: 2 }} />
                <Alert severity="info" sx={{ mb: 3 }}>
                Please review all the information you've entered before finalizing your resume.
                Once you're satisfied, click the "Create Resume" button.
                </Alert>
                
                <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Resume Summary</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Name:</strong> {formData.fullName || 'Not provided'}
              </Typography>
            </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {formData.email || 'Not provided'}
                      </Typography>
          </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Phone:</strong> {formData.phone || 'Not provided'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Education:</strong> {formData.education.length} entries
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Experience:</strong> {formData.experience.length} entries
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Skills:</strong> {formData.skills.filter(s => s.trim() !== '').length} skills
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Projects:</strong> {formData.projects.filter(p => p.name).length} projects
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Certificates:</strong> {formData.certifications.filter(c => c.name).length} certificates
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Template:</strong> {templates.find(t => t.id === formData.selectedTemplate)?.name || 'Modern'}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<VisibilityOutlined />}
                      onClick={() => setShowFinalPreview(true)} // Updated to use renamed state
                      sx={{ 
                        borderRadius: '8px',
                        px: 3,
                        mr: 2
                      }}
                    >
                      Preview Full Resume
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  // Add print styles when component mounts
  useEffect(() => {
    // Create a style element for print media
    const style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    
    // CSS for print mode
    style.innerHTML = `
      @page {
        size: A4;
        margin: 10mm;
      }
      body * {
        visibility: hidden;
      }
      .resume-template, .resume-template * {
        visibility: visible;
      }
      .resume-template {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        box-shadow: none !important;
        border: none !important;
      }
      .resume-template .MuiChip-root {
        border: 1px solid #ddd !important;
      }
    `;
    
    // Append style to head
    document.head.appendChild(style);
    
    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: "", technologies: "", duration: "", url: "", description: "" }]
    });
  };

  const removeProject = (index) => {
    const newProjects = [...formData.projects];
    newProjects.splice(index, 1);
    setFormData({
      ...formData,
      projects: newProjects
    });
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData({
      ...formData,
      projects: newProjects
    });
  };

  return (
    <Box sx={{ 
      py: 6, 
      background: 'linear-gradient(to bottom, #f7f9fc, #edf2f7)',
      minHeight: '100vh'
    }}>
      <Container maxWidth="md">
        {successMessage && (
          <Fade in={successMessage}>
            <Alert 
              severity="success" 
              sx={{ mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
              onClose={() => setSuccessMessage(false)}
            >
              Your resume has been successfully created! You can now download or share it.
            </Alert>
          </Fade>
        )}
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              color="primary" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Create Your Professional Resume
          </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: '600px', mx: 'auto' }}
            >
              Complete the form below to build a tailored resume that showcases your skills and experience effectively
          </Typography>
          </Box>
          
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel 
            sx={{ 
              mb: 5, 
              mt: 4,
              "& .MuiStepLabel-root .Mui-completed": {
                color: theme.palette.primary.main
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                color: theme.palette.grey[700]
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: theme.palette.primary.main
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 4 }}>
            {renderStepContent(activeStep)}
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 4,
              borderTop: '1px solid #e0e0e0',
              pt: 3
            }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
                sx={{ 
                  borderRadius: '8px',
                  px: 3
                }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  color="primary"
                  type="submit"
                  disabled={!isStepValid()}
                  startIcon={<SaveIcon />}
                  sx={{ 
                    borderRadius: '8px',
                    px: 3,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  Create Resume
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                  disabled={!isStepValid()}
                  sx={{ 
                    borderRadius: '8px',
                    px: 3,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>

      {/* Template Quick Preview Dialog (New) */}
      <Dialog
        open={showTemplatePreview}
        onClose={closeTemplatePreview}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Template Preview: {previewTemplate ? templates.find(t => t.id === previewTemplate)?.name : 'Template'}
            </Typography>
            <IconButton onClick={closeTemplatePreview} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* Template preview content would go here if needed */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This is a preview of how your resume would look in this template style.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTemplatePreview} color="primary">
            Close
          </Button>
          <Button 
            onClick={() => {
              setFormData({...formData, selectedTemplate: previewTemplate});
              closeTemplatePreview();
            }} 
            color="primary" 
            variant="contained"
            disabled={!previewTemplate}
          >
            Select This Template
          </Button>
        </DialogActions>
      </Dialog>

      {/* Resume Final Preview Dialog (Renamed) */}
      <Dialog 
        open={showFinalPreview} 
        onClose={handleCloseFinalPreview}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Your Resume Preview
            </Typography>
            <IconButton onClick={handleCloseFinalPreview} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          {/* ... existing dialog content ... */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Button 
              startIcon={<PrintIcon />} 
              variant="outlined" 
              sx={{ mx: 1 }}
              onClick={handlePrint}
            >
              Print
            </Button>
            <Button 
              startIcon={<DownloadIcon />} 
              variant="outlined" 
              sx={{ mx: 1 }}
              onClick={handleOpenDownloadMenu}
              aria-controls="download-menu"
              aria-haspopup="true"
            >
              Download
            </Button>
            <Menu
              id="download-menu"
              anchorEl={downloadAnchorEl}
              keepMounted
              open={Boolean(downloadAnchorEl)}
              onClose={handleCloseDownloadMenu}
            >
              <MenuItem onClick={handleDownloadPDF}>
                <ListItemIcon>
                  <PdfIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>PDF Format</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDownloadDOCX}>
                <ListItemIcon>
                  <DocxIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText>Word Document</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDownloadTXT}>
                <ListItemIcon>
                  <TxtIcon fontSize="small" color="action" />
                </ListItemIcon>
                <ListItemText>Plain Text</ListItemText>
              </MenuItem>
            </Menu>
            <Button 
              startIcon={<ShareIcon />} 
              variant="outlined" 
              sx={{ mx: 1 }}
              onClick={handleShareResume}
            >
              Share
            </Button>
          </Box>

          {/* Resume Template */}
          <Paper 
            elevation={0} 
            variant="outlined" 
            sx={{ 
              p: 4, 
              mb: 3, 
              width: '100%',
              minHeight: '800px',
              backgroundColor: '#fff'
            }}
            className="resume-template"
            ref={resumeRef}
          >
            {/* Render the selected template */}
            {formData.selectedTemplate === 'modern' && (
              <Box className="modern-template">
                {/* Header */}
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#2c3e50' }}>
                    {formData.fullName || 'Your Name'}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#3498db', mb: 1 }}>
                    {formData.jobTitle || 'Professional Title'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                    {formData.email && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmailIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                        <Typography variant="body2">{formData.email}</Typography>
                      </Box>
                    )}
                    {formData.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                        <Typography variant="body2">{formData.phone}</Typography>
                      </Box>
                    )}
                    {formData.address && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HomeIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                        <Typography variant="body2">{formData.address}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Objective */}
                {formData.objective && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1, 
                        pb: 1, 
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main
                      }}
                    >
                      PROFESSIONAL SUMMARY
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {formData.objective}
                    </Typography>
                  </Box>
                )}

                {/* Education */}
                {formData.education.length > 0 && formData.education.some(edu => edu.institute) && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        pb: 1, 
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main
                      }}
                    >
                      EDUCATION
                    </Typography>
                    {formData.education.map((edu, index) => (
                      edu.institute && (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {edu.institute}
                            </Typography>
                            {edu.year && (
                              <Typography variant="body2" color="text.secondary">
                                {edu.year}
                              </Typography>
                            )}
                          </Box>
                          <Typography variant="body1">
                            {edu.degree}
                          </Typography>
                          {edu.grade && (
                            <Typography variant="body2" color="text.secondary">
                              Grade: {edu.grade}
                            </Typography>
                          )}
                        </Box>
                      )
                    ))}
                  </Box>
                )}

                {/* Work Experience */}
                {formData.experience.length > 0 && formData.experience.some(exp => exp.company) && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        pb: 1, 
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main
                      }}
                    >
                      WORK EXPERIENCE
                    </Typography>
                    {formData.experience.map((exp, index) => (
                      exp.company && (
                        <Box key={index} sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {exp.company}
                            </Typography>
                            {exp.duration && (
                              <Typography variant="body2" color="text.secondary">
                                {exp.duration}
                              </Typography>
                            )}
                          </Box>
                          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                            {exp.position}
                          </Typography>
                          {exp.description && (
                            <Typography variant="body2">
                              {exp.description}
                            </Typography>
                          )}
                        </Box>
                      )
                    ))}
                  </Box>
                )}

                {/* Skills */}
                {formData.skills.length > 0 && formData.skills.some(skill => skill.trim() !== "") && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        pb: 1, 
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main
                      }}
                    >
                      SKILLS
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.skills.map((skill, index) => (
                        skill.trim() !== "" && (
                          <Chip 
                            key={index} 
                            label={skill} 
                            sx={{ 
                              m: 0.5, 
                              bgcolor: theme.palette.primary.light + '20',
                              color: theme.palette.primary.dark,
                              fontWeight: 500
                            }} 
                          />
                        )
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Projects */}
                {formData.projects.length > 0 && formData.projects.some(project => project.name) && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        pb: 1, 
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main
                      }}
                    >
                      PROJECTS
                    </Typography>
                    {formData.projects.map((project, index) => (
                      project.name && (
                        <Box key={index} sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {project.name}
                            </Typography>
                            {project.duration && (
                              <Typography variant="body2" color="text.secondary">
                                {project.duration}
                              </Typography>
                            )}
                          </Box>
                          {project.technologies && (
                            <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 0.5 }}>
                              Technologies: {project.technologies}
                            </Typography>
                          )}
                          {project.description && (
                            <Typography variant="body2">
                              {project.description}
                            </Typography>
                          )}
                          {project.url && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              <Link href={project.url} target="_blank" rel="noopener" sx={{ color: theme.palette.primary.main }}>
                                View Project
                              </Link>
                            </Typography>
                          )}
                        </Box>
                      )
                    ))}
                  </Box>
                )}

                {/* Certifications */}
                {formData.certifications.length > 0 && formData.certifications.some(cert => cert.name) && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        pb: 1, 
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main
                      }}
                    >
                      CERTIFICATIONS
                    </Typography>
                    {formData.certifications.map((cert, index) => (
                      cert.name && (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {cert.name}
                            </Typography>
                            {cert.date && (
                              <Typography variant="body2" color="text.secondary">
                                {cert.date}
                              </Typography>
                            )}
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {cert.issuer}
                          </Typography>
                          {cert.description && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {cert.description}
                            </Typography>
                          )}
                        </Box>
                      )
                    ))}
                  </Box>
                )}
              </Box>
            )}
            
            {formData.selectedTemplate === 'professional' && (
              <Box className="professional-template">
                {/* Professional Template */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  mb: 4,
                  pb: 2,
                  borderBottom: '1px solid #ddd'
                }}>
                  {/* Header content for professional template */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#34495e' }}>
                      {formData.fullName || 'Your Name'}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#2ecc71', mb: 2 }}>
                      {formData.jobTitle || 'Professional Title'}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems: { xs: 'flex-start', sm: 'flex-end' },
                    mt: { xs: 2, sm: 0 }
                  }}>
                    {formData.email && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon fontSize="small" sx={{ mr: 0.5, color: '#34495e' }} />
                        <Typography variant="body2">{formData.email}</Typography>
                      </Box>
                    )}
                    {formData.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: '#34495e' }} />
                        <Typography variant="body2">{formData.phone}</Typography>
                      </Box>
                    )}
                    {formData.address && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <HomeIcon fontSize="small" sx={{ mr: 0.5, color: '#34495e' }} />
                        <Typography variant="body2">{formData.address}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Add other professional template sections... */}
              </Box>
            )}
            
            {/* Add more template variations here */}
            {formData.selectedTemplate === 'creative' && (
              <Box className="creative-template" sx={{ color: '#333' }}>
                {/* Creative Template with more artistic styling */}
                <Box sx={{ 
                  background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
                  color: 'white',
                  p: 3,
                  borderRadius: '8px',
                  mb: 4
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {formData.fullName || 'Your Name'}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {formData.jobTitle || 'Creative Professional'}
                  </Typography>
                </Box>
                
                {/* Add other creative template sections... */}
              </Box>
            )}
            
            {formData.selectedTemplate === 'minimal' && (
              <Box className="minimal-template" sx={{ color: '#2c3e50' }}>
                {/* Minimal Template with clean, simple design */}
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                  <Typography variant="h3" sx={{ fontWeight: 300, mb: 1, letterSpacing: 1 }}>
                    {formData.fullName || 'Your Name'}
                  </Typography>
                  <Divider sx={{ width: '60px', mx: 'auto', mb: 2, borderColor: '#7f8c8d' }} />
                  <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
                    {formData.jobTitle || 'Professional Title'}
                  </Typography>
                  
                  {/* Add other minimal template sections... */}
                </Box>
              </Box>
            )}
          </Paper>
         </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseFinalPreview} variant="outlined">
            Go Back to Editor
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSaveResume}
          >
            Finish & Save Resume
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateResume;
