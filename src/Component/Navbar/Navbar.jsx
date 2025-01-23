import React, { useState } from "react";
import '../Navbar/Navbar.css'; 
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = ({ IsLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };

  const [showDropDown, setShowDropDown] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropDown(false); 
  };

  const handleProfileClick = (event) => {
    event.stopPropagation(); // Prevent dropdown from closing on clicks outside
    if (IsLoggedIn) {
      setShowDropDown(!showDropDown); 
    }
  };

  return (
    <div className='nav'>
      <div className="nav-logo">Calorie-Count</div>
      <button className="nav-toggle">☰</button>
      <ul className="nav-menu">
        <li><Link to='/'><p>Home</p></Link></li>
        <li><Link to='/about'><p>About Us</p></Link></li>
        <li><Link to='/contact'><p>Contact</p></Link></li>
        <div className={`nav-circle ${IsLoggedIn ? 'logged-in' : ''}`}  onClick={handleProfileClick}> <IoPersonCircleOutline />

          {IsLoggedIn && ( 
            <div className={`profile-dropdown ${showDropDown ? 'show' : ''}`}> 
              <ul>
                <li><Link to='/profile'>Your Profile</Link></li> 
                <li>Settings</li> 
                <li>Logout</li>
                <li><Link to = '/nutrition'>Your Nutrition</Link></li>
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