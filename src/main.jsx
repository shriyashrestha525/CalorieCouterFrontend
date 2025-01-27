import { StrictMode, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Application/Home';
import App from './App';
import Contact from './Application/Contact';
import About from './Application/About';
import ImageRecognization from './Application/ImageRecognization';
import Login from './Component/pages/login';
import Register from './Component/pages/register';
import Navbar from './Component/Navbar/Navbar';
import Profile from './Component/pages/profile';
import Nutrition from './Component/pages/nutrition';
import NutritionAndProfile from './Component/pages/yourProfile';

const AppWrapper = () => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  // Function to refresh the access token using the refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        console.error("No refresh token found.");
        return null;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        console.error("Failed to refresh token:", response.statusText);
        return null;
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.access);
      localStorage.setItem("tokenExpiration", Date.now() + 3600000);  // Set new expiration time (1 hour)
      return data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  // Check if the user is logged in or needs a token refresh
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const authToken = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!authToken && !refreshToken) {
        setIsLoggedIn(false);
        return;
      }

      // If there's an auth token, check if it's expired
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const currentTime = Date.now();

      if (authToken && currentTime > tokenExpiration) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(true);
      }
    };

    checkAndRefreshToken();
  }, []);

  return (
    <BrowserRouter>
      <Navbar IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home IsLoggedIn={IsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/imagerecognization" element={<ImageRecognization />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutritionProfile" element={<NutritionAndProfile />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);