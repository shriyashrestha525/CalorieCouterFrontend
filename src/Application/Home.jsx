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
            <div className="first">
                <div className="quote">
                    <h1>Know your Food, Love your Health, Count your Calories</h1>
                    <div className="calculate-btn-container">
                    {IsLoggedIn ? (
                        <div className="btn">
                            <button onClick= {handleNavigate}>Calculate your Calories<FaLongArrowAltRight /></button>
                        </div>
                    ):(
                        <button onClick= {handleLogin}>Calculate your Calories<FaLongArrowAltRight /></button>
                        
                    )}
                    </div>
                </div>
                <div className="image">
                        <img src="src/assets/calorief.jpg" alt="image1" />
                    </div>
        </div>
        <div className="second">
            <div className="text2">
                <h1>Records of 101 Foods.</h1>
                <p>Analyze your meals, track your calories, and make informed food choices to achieve your health goals.</p>
            </div>
            <div className="image2">
                <img src="src/assets/calorieg.jpg" alt="image2" />
            </div>
        </div>

        <div className="third">
            <div className="text3">
                <h1>Food recognition model</h1>
                <p>Calorie Counter App leverages advanced deep learning models to accurately identify food items and provide precise nutritional information. We have experimented with multiple CNN architectures to ensure the best possible performance. Our basic CNN model achieved an accuracy of 48%, offering a foundational approach to food recognition. By implementing InceptionV3, a more sophisticated model known for its deep architecture and efficient feature extraction, we improved accuracy to 66%. Finally, we adopted MobileNetV2, a lightweight yet powerful model optimized for mobile devices, achieving an impressive 74% accuracy. With these AI-driven enhancements, our app ensures reliable food detection, helping users effortlessly track their calorie intake and make informed dietary choices.</p>

            </div>
        </div>

        <footer class="footers">
            <div class="footer-link">
                
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
            
            {/* <div className="text-container">
                <div className="text-box">
                    <p>
                    A calorie counter WebApp helps users track their daily food intake and monitor their nutritional consumption, including calories, protein, fats, and carbohydrates. It allows users to use image recognition to detect food and estimate its nutritional values. By setting personalized goals based on weight, height, gender, the app provides insights into maintaining a balanced diet. With features like real-time progress tracking, and reminders, a calorie counter app makes healthy eating more accessible and effective.</p>
                </div>

                <div className="text-box">
                    <p>Our Calorie Counter App leverages advanced deep learning models to accurately identify food items and provide precise nutritional information. We have experimented with multiple CNN architectures to ensure the best possible performance. Our basic CNN model achieved an accuracy of 48%, offering a foundational approach to food recognition. By implementing InceptionV3, a more sophisticated model known for its deep architecture and efficient feature extraction, we improved accuracy to 66%. Finally, we adopted MobileNetV2, a lightweight yet powerful model optimized for mobile devices, achieving an impressive 74% accuracy. With these AI-driven enhancements, our app ensures reliable food detection, helping users effortlessly track their calorie intake and make informed dietary choices.</p>
                </div>
            </div> */}
           
        </div>
    )
}
export default Home;