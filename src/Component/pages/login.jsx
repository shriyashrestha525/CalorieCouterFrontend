import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomFormField from '../Customfield/custom_form_field';  // Assuming you have a custom field component
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password }, { headers: { 'Content-Type': 'application/json' } });
      
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token);  // Store token in localStorage
        setIsLoggedIn(true);  // Update the logged-in status
        navigate("/");  // Navigate to the Home page
      }
    } catch (error) {
      console.log("Invalid credentials. Please try again.");
    }
    
  }

  const handleOnUsernameChange = (e) => setUsername(e.target.value);
  const handleOnPasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <CustomFormField 
            label="Email" 
            placeholder="Enter your email" 
            type="text" 
            value={username} 
            onChange={handleOnUsernameChange} 
          />
        </div>
        <div>
          <CustomFormField 
            label="Password" 
            placeholder="Enter your password" 
            type="password" 
            value={password} 
            onChange={handleOnPasswordChange} 
          />
        </div>
        <div>
          <input id="login-button" type="submit" value="Login" />
        </div>
      </form>
      <p style={{ textAlign: 'center', color: 'teal', fontSize: '14px', marginTop: '15px' }}>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
