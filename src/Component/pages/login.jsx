import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomFormField from '../Customfield/custom_form_field';  // Assuming you have a custom field component
import axios from 'axios';
import '../../style/login.css';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        localStorage.setItem('refreshToken', response.data.refresh_token);  // Refresh token
        localStorage.setItem('tokenExpiration', Date.now() + 3600000);
        setIsLoggedIn(true);  // Update the logged-in status
        navigate("/");  // Navigate to the Home page
      }else {
        setError("Invalid response from server. Tokens not found.");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);  // Show the error message from backend
      } else {
        setError("An unknown error occurred.");
      }
    }
    
  }

  const handleOnUsernameChange = (e) => setUsername(e.target.value);
  const handleOnPasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="log">
        <div className="login-page">
          <div className="topic">
            <h2>Login</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <CustomFormField 
                label="Username" 
                placeholder="Enter your username" 
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
            {error && <p className="error-message">{error}</p>} {/* Display the error message */}
            <div>
              <input id="login-button" type="submit" value="Login" />
            </div>
          </form>
          <p style={{ textAlign: 'center', color: 'teal', fontSize: '14px', marginTop: '15px' }}>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </div>
        <footer class="footer">
            <div class="footer-links">
                
                <a href="#">Blog</a>
                <a href="#">Terms and Conditions</a>
                <a href="#">Privacy Policy</a>
                <a href="#">API</a>
                <a href="#">Feedback</a>
                <a href="#">Community Guidelines</a>
            <a href="#">Cookie Preferences</a>
            </div>
            <p>© 2025 CalorieCounter, Inc.</p>
        </footer>
    </div>
  );
}

export default Login;
