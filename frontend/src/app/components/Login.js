import { useState } from 'react';
import axios from 'axios';
// import { Button, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    const response = await axios.post('http://localhost:4000/api/login', { username });
    onLogin(username, response.data.sessionId);
  };

  return (
    <Container maxWidth="xs">
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  </Container>

    
  );
};

export default Login;
