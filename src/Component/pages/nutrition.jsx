import { useLocation, useNavigate } from "react-router-dom";
import "../../style/nutrition.css";
import { useEffect, useState } from "react";

const Nutrition = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Function to fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user-profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Send JWT token stored in localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile data");
        }

        const data = await response.json();
        console.log("User profile data:", data);
        setUserProfile(data); // Set retrieved user profile data to state
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        // Handle error (e.g., redirect to login if token is invalid/expired)
      }
    };

    fetchUserProfile();
  }, []);

  // Simple formula for calorie and protein calculation (adjust as needed)
  const calculateCalories = () => {
    if (!userProfile) return 0; // Handle case when userProfile is not yet fetched
    const { height, weight, gender } = userProfile;
    return gender === "female"
      ? 10 * weight + 6.25 * height - 5 * 25 - 161
      : 10 * weight + 6.25 * height - 5 * 25 + 5;
  };

  const calculateProtein = () => {
    if (!userProfile) return 0; // Handle case when userProfile is not yet fetched
    const { weight } = userProfile;
    return weight * 1.6; // Example: 1.6g of protein per kg of body weight
  };

  const calculateFats = (calories) => {
    return (calories * 0.3) / 9; // 30% of calories from fats, 9 kcal per gram of fat
  };

  const calculateCarbs = (calories, protein, fats) => {
    if (!userProfile) return 0;
    const caloriesFromProtein = protein * 4; // 4 kcal per gram of protein
    const caloriesFromFats = fats * 9; // 9 kcal per gram of fat
    return (calories - (caloriesFromProtein + caloriesFromFats)) / 4; // Remaining calories for carbs (4 kcal per gram)
  };

  // Perform calculations
  const dailyCalories = Math.round(calculateCalories());
  const dailyProtein = Math.round(calculateProtein());
  const dailyFats = Math.round(calculateFats(dailyCalories));
  const dailyCarbs = Math.round(calculateCarbs(dailyCalories, dailyProtein, dailyFats));

  const handleProfileNavigation = () => {
    navigate("/profile", {
      state: { dailyCalories, dailyProtein, dailyFats, dailyCarbs },
    });
  };

  return (
    <div className="nutrition-display">
      <h1>Nutrition Recommendations</h1>
      <p>Based on your information, here are your daily intake recommendations:</p>
      <ul>
        <li><strong>Calories:</strong> {dailyCalories} kcal/day</li>
        <li><strong>Protein:</strong> {dailyProtein} g/day</li>
        <li><strong>Fats:</strong> {dailyFats} g/day</li>
        <li><strong>Carbs:</strong> {dailyCarbs} g/day</li>
      </ul>
      <button onClick={handleProfileNavigation}>Go to Profile</button>
    </div>
  );
};

export default Nutrition;
