import React, { useState } from "react";
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
  Chip 
} from "@mui/material";
import { 
  ArrowForward, 
  ArrowBack, 
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const CreateResume = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    objective: "",
    education: [{ institute: "", degree: "", year: "", grade: "" }],
    experience: [{ company: "", position: "", duration: "", description: "" }],
    skills: [""],
  });

  // Steps for the stepper
  const steps = [
    'Personal Information',
    'Education',
    'Work Experience',
    'Skills & Finalize'
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
      education: [...formData.education, { institute: "", degree: "", year: "", grade: "" }]
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", position: "", duration: "", description: "" }]
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Resume created successfully!");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>Personal Details</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
              />
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
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="primary">Education</Typography>
              <Button 
                startIcon={<AddIcon />} 
                onClick={addEducation} 
                variant="outlined" 
                color="primary"
                size="small"
              >
                Add Education
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            {formData.education.map((edu, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined" sx={{ mb: 2, position: 'relative' }}>
                  <CardContent>
                    {formData.education.length > 1 && (
                      <IconButton 
                        size="small" 
                        color="error" 
                        sx={{ position: 'absolute', right: 0, top: 0 }}
                        onClick={() => removeEducation(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    <Grid container spacing={2}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="primary">Work Experience</Typography>
              <Button 
                startIcon={<AddIcon />} 
                onClick={addExperience} 
                variant="outlined" 
                color="primary"
                size="small"
              >
                Add Experience
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            {formData.experience.map((exp, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined" sx={{ mb: 2, position: 'relative' }}>
                  <CardContent>
                    {formData.experience.length > 1 && (
                      <IconButton 
                        size="small" 
                        color="error" 
                        sx={{ position: 'absolute', right: 0, top: 0 }}
                        onClick={() => removeExperience(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    <Grid container spacing={2}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="primary">Skills</Typography>
              <Button 
                startIcon={<AddIcon />} 
                onClick={addSkill} 
                variant="outlined" 
                color="primary"
                size="small"
              >
                Add Skill
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                        sx={{ width: '80px' }}
                      />
                    }
                    onDelete={() => formData.skills.length > 1 && removeSkill(index)}
                    sx={{ m: 0.5, height: 'auto', p: 0.5 }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Typography variant="h6" color="primary">Review Your Resume</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" paragraph>
                Please review all the information you've entered before finalizing your resume.
                Once you're satisfied, click the "Create Resume" button.
              </Typography>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 5, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Create Your Resume
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            Fill in the form below to create a professional resume
          </Typography>
          
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  color="primary"
                  type="submit"
                >
                  Create Resume
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateResume;
