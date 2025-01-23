import { useState } from "react";
import Background from "../Component/Background/Background";
import Navbar from "../Component/Navbar/Navbar";
import Caloriefood from "../Component/Caloriefood/Caloriefood";
import "../style/Home.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";


const Home = ({IsLoggedIn}) => {
    const quote = "Know your Food, Love your Health, Count your Calories"
    const location = useLocation();

    

    const navigate = useNavigate();
        const handleNavigate = () => {
            navigate('/imagerecognization');
        };

        const handleGoToNutrition = () => {
            navigate("/nutrition");
          };

        const handleLogin = () => {
            navigate('/login');
        };
    return (
        
        <div className="home-container">
            <div className="quote">
                <h3>Know your Food, Love your Health, Count your Calories</h3>
            </div>
            
            <div className="text-container">
                <div className="text-box">
                    <p>A calorie counter app is a digital tool designed to help individuals track their daily food intake and monitor their calorie consumption. These apps typically allow users to input the foods they eat, either by manually entering them or by scanning barcodes. The app then calculates the calorie count, along with other nutritional information such as protein, carbohydrates, and fat. Many calorie counter apps also provide features like meal planning, recipe databases, exercise tracking, and personalized goal setting to assist users in achieving their dietary and fitness objectives. By using a calorie counter app, individuals can gain insights into their eating habits, make informed food choices, and potentially manage their weight more effectively.</p>
                </div>

                <div className="text-box">
                    <p>A calorie counter app is a digital tool designed to help individuals track their daily food intake and monitor their calorie consumption. These apps typically allow users to input the foods they eat, either by manually entering them or by scanning barcodes. The app then calculates the calorie count, along with other nutritional information such as protein, carbohydrates, and fat. Many calorie counter apps also provide features like meal planning, recipe databases, exercise tracking, and personalized goal setting to assist users in achieving their dietary and fitness objectives. By using a calorie counter app, individuals can gain insights into their eating habits, make informed food choices, and potentially manage their weight more effectively.</p>
                </div>
            </div>
            <div className="calculate-btn-container">
                {IsLoggedIn ? (
                    <div className="btn">
                        <button onClick= {handleNavigate}>Calculate your Calories<FaLongArrowAltRight /></button>
                        <button onClick={handleGoToNutrition}>Know your Nutrional Information<FaLongArrowAltRight /></button>
                    </div>
                ):(
                    <button onClick= {handleLogin}>Calculate your Calories<FaLongArrowAltRight /></button>
                    
                )}
                
            </div>
        </div>
    )
}
export default Home;