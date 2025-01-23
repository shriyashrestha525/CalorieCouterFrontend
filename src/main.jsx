import { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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

const AppWrapper = () => {
    const [IsLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Navbar IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home IsLoggedIn={IsLoggedIn}/>} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/imagerecognization" element={<ImageRecognization />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/nutrition" element={<Nutrition />} />


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
