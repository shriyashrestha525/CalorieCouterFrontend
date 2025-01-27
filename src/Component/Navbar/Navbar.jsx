import React, { useState, useEffect } from "react";
import '../Navbar/Navbar.css'; 
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = ({ IsLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);

  // Function to refresh the token using the refreshToken
  const refreshAuthToken = async (refreshToken) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const data = await response.json();

      if (response.ok && data.access) {
        // Save the new authToken and its expiration time
        localStorage.setItem("authToken", data.access);
        localStorage.setItem("tokenExpiration", Date.now() + 3600000);  // Token expiration set to 1 hour
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsLoggedIn(false);
    }
  };

  // Check if the user is logged in based on token expiration
  useEffect(() => {
    const checkLoginStatus = async () => {
      const authToken = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const currentTime = Date.now();

      if (authToken && currentTime < tokenExpiration) {
        setIsLoggedIn(true);
      } else if (refreshToken) {
        await refreshAuthToken(refreshToken);  // Call the refresh token function if the token has expired
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [setIsLoggedIn]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Remove authentication token and refresh token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    setIsLoggedIn(false);
    setShowDropDown(false); // Close dropdown
    navigate('/login');  // Redirect to login page after logout
  };

  const handleProfileClick = (event) => {
    event.stopPropagation(); // Prevent dropdown from closing on clicks outside
    if (IsLoggedIn) {
      setShowDropDown(!showDropDown);
    }
  };

  return (
    <div className="nav">
      <div className="nav-logo">Calorie-Counter</div>
      <ul className="nav-menu">
        <li><Link to='/'><p>Home</p></Link></li>
        <li><Link to='/about'><p>About Us</p></Link></li>

        <div className={`nav-circle ${IsLoggedIn ? 'logged-in' : ''}`} onClick={handleProfileClick}>
          <IoPersonCircleOutline />

          {IsLoggedIn && (
            <div className={`profile-dropdown ${showDropDown ? 'show' : ''}`}>
              <ul>
                <li><Link to='/nutritionProfile'>My Profile</Link></li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}

          {!IsLoggedIn && (
            <span onClick={handleLogin}>Sign in</span>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;