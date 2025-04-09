import React, { useState } from 'react';
import { Typography, TextField, Button, Paper } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '20px', width: '300px' }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Register;
