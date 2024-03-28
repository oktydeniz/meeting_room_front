import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.js";
import { Card, Box, Button, Typography } from "@mui/material";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userType", data.user_type);
        setIsAuthenticated(true);
        navigate("/admin");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("There was a problem with the login request:", error);
    }
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ marginBottom: 2, textAlign: "center" }}
        >
          Login
        </Typography>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{
              margin: "10px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              margin: "10px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Button variant="text" sx={{ mt: 2 }} onClick={handleRegister}>
            Register
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default Login;
