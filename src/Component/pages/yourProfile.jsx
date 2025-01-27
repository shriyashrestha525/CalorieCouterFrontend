import React, { useEffect, useState } from 'react';
import "../../style/yourProfile.css";
import { SiGreasyfork } from "react-icons/si";
import { AiFillThunderbolt } from "react-icons/ai";
import { PiGrains } from "react-icons/pi";
import { IoMdWater } from "react-icons/io";

const NutritionAndProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [recentFoods, setRecentFoods] = useState([]);
  const [remainingCalories, setRemainingCalories] = useState(0);
  const [remainingProtein, setRemainingProtein] = useState(0);
  const [remainingFats, setRemainingFats] = useState(0);
  const [remainingCarbs, setRemainingCarbs] = useState(0);

  // New states for daily nutrient calculations
  const [dailyCalories, setDailyCalories] = useState(0);
  const [dailyProtein, setDailyProtein] = useState(0);
  const [dailyFats, setDailyFats] = useState(0);
  const [dailyCarbs, setDailyCarbs] = useState(0);

  // Function to refresh access token using the refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.log("No refresh token available");
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
        console.log("Failed to refresh token");
        return null;
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.access);  // Save the new access token
      localStorage.setItem("tokenExpiration", Date.now() + 3600000);  // Update token expiration
      return data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const authToken = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!authToken && !refreshToken) {
        console.log("User is not logged in.");
        return;
      }

      // Check if the access token is expired
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const currentTime = Date.now();

      if (authToken && currentTime > tokenExpiration) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          console.log("Access token refreshed.");
        } else {
          console.log("Failed to refresh token.");
        }
      }
    };

    checkAndRefreshToken();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const response = await fetch("http://127.0.0.1:8000/api/user-profile/", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile data");
        }

        const data = await response.json();
        setUserProfile(data);

        // Calculate daily intake recommendations based on user profile
        const calculatedCalories = Math.round(
          data.gender === "female"
            ? 10 * data.weight + 6.25 * data.height - 5 * 25 - 161
            : 10 * data.weight + 6.25 * data.height - 5 * 25 + 5
        );

        const calculatedProtein = Math.round(data.weight * 1.6);
        const calculatedFats = Math.round((calculatedCalories * 0.3) / 9);
        const calculatedCarbs = Math.round(
          (calculatedCalories - (calculatedProtein * 4 + calculatedFats * 9)) / 4
        );

        // Set calculated daily values
        setDailyCalories(calculatedCalories);
        setDailyProtein(calculatedProtein);
        setDailyFats(calculatedFats);
        setDailyCarbs(calculatedCarbs);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!userProfile || !dailyCalories) return;

    const fetchRecentFoods = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const response = await fetch("http://127.0.0.1:8000/api/recent_foods/", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recent foods");
        }

        const data = await response.json();
        setRecentFoods(data.recent_foods);

        let totalCaloriesConsumed = 0;
        let totalProteinConsumed = 0;
        let totalFatsConsumed = 0;
        let totalCarbsConsumed = 0;

        data.recent_foods.forEach((food) => {
          const calories = parseFloat(food.nutritional_info.find((n) => n.name === "calories")?.value) || 0;
          const protein = parseFloat(food.nutritional_info.find((n) => n.name === "protein")?.value) || 0;
          const fat = parseFloat(food.nutritional_info.find((n) => n.name === "fat")?.value) || 0;
          const carbs = parseFloat(food.nutritional_info.find((n) => n.name === "carbohydrates")?.value) || 0;

          // Sum the consumed nutrients
          totalCaloriesConsumed += calories;
          totalProteinConsumed += protein;
          totalFatsConsumed += fat;
          totalCarbsConsumed += carbs;
        });

        console.log('Consumed nutrients:', {
          totalCaloriesConsumed,
          totalProteinConsumed,
          totalFatsConsumed,
          totalCarbsConsumed,
        });
        // Subtract the total consumed nutrients from the daily recommendations
        setRemainingCalories(Math.max(0, dailyCalories - totalCaloriesConsumed));
        setRemainingProtein(Math.max(0, dailyProtein - totalProteinConsumed));
        setRemainingFats(Math.max(0, dailyFats - totalFatsConsumed));
        setRemainingCarbs(Math.max(0, dailyCarbs - totalCarbsConsumed));

        console.log("Remaining Nutrients:", {
          remainingCalories,
          remainingProtein,
          remainingFats,
          remainingCarbs,
        });
      } catch (error) {
        console.error("Error fetching recent foods:", error);
      }
    };

    fetchRecentFoods();
  }, [userProfile, dailyCalories, dailyProtein, dailyFats, dailyCarbs]);

  return (
    <div className="box">
      <div className="nutrition-display">
        <h1>Nutrition and Profile Information</h1>
        <div className="nutrition-info">
          <h2>Daily Nutrition Recommendations</h2>
          <ul>
            <li><strong>Calories:</strong> {dailyCalories} kcal/day</li>
            <li><strong>Protein:</strong> {dailyProtein} g/day</li>
            <li><strong>Fats:</strong> {dailyFats} g/day</li>
            <li><strong>Carbs:</strong> {dailyCarbs} g/day</li>
          </ul>
        </div>

        <div className="profile-info">
          <h2>Remaining Nutrients</h2>
          <div className="info">
            <div className="nutrient">
              <div className="inside">
                <h3>Remaining Calories</h3>
                <SiGreasyfork style={{ fontSize: "40px" }} />
              </div>
              <p>{remainingCalories} kcal</p>
            </div>
            <div className="nutrient">
              <div className="inside">
                <h3>Remaining Protein</h3>
                <AiFillThunderbolt style={{ fontSize: "40px" }} />
              </div>
              <p>{remainingProtein} g</p>
            </div>
            <div className="nutrient">
              <div className="inside">
                <h3>Remaining Fats</h3>
                <PiGrains style={{ fontSize: "40px" }} />
              </div>
              <p>{remainingFats} g</p>
            </div>
            <div className="nutrient">
              <div className="inside">
                <h3>Remaining Carbs</h3>
                <IoMdWater style={{ fontSize: "40px" }} />
              </div>
              <p>{remainingCarbs} g</p>
            </div>
          </div>
        </div>

        <div className="recent-foods">
          <h2>Recently Eaten Foods</h2>
          <ul>
            {recentFoods.length > 0 ? (
              recentFoods.map((food, index) => {
                const calorieInfo = food.nutritional_info.find((nutrient) => nutrient.name === "calories");
                return (
                  <li key={index}>
                    {food.label} - {calorieInfo ? `${calorieInfo.value} kcal` : "Data not available"}
                  </li>
                );
              })
            ) : (
              <p>No food records for today.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NutritionAndProfile;
