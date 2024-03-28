import "./App.css";
import UserLayout from "./UserLayout.js";
import MeetingsHome from "./screen/MeetingsHome.js";
import React from "react";
import PrivateRoute from "./PrivateRoute.js"
import { Navigate} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./screen/Login.js";
import Register from "./screen/Register.js";
function App() {
  const allowedRoles = ["admin"];
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const userType = localStorage.getItem("userType");
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserLayout />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <MeetingsHome />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
