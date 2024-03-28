import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../AuthContext.js'
import { Card, Box, Button, Typography } from '@mui/material';
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.id);
                localStorage.setItem('userType', data.user_type);
                setIsAuthenticated(true);
                navigate('/admin');
            } else {
                console.error('Register failed');
            }
        } catch (error) {
            console.error('There was a problem with the register request:', error);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ minWidth: 275, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '16px', padding: '20px' }}>
          <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
            Register
          </Typography>
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ margin: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ margin: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
            />
            <Button variant="text" sx={{ mt: 2 }} onClick={handleRegister}>
            Register
          </Button>
          </form>
        </Card>
      </Box>
    );
}

export default Register;
