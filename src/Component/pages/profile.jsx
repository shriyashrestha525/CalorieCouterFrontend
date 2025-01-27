import React, { useEffect, useState } from 'react'
import '../../style/profile.css'
import { SiGreasyfork } from "react-icons/si";
import { AiFillThunderbolt } from "react-icons/ai";
import { PiGrains } from "react-icons/pi";
import { IoMdWater } from "react-icons/io";
import { useLocation } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const { dailyCalories = 0, dailyProtein = 0, dailyFats = 0, dailyCarbs = 0 } = location.state || {};

  const [recentFoods, setRecentFoods] = useState([]);
  const [remainingCalories, setRemainingCalories] = useState(dailyCalories);
  const [remainingProtein, setRemainingProtein] = useState(dailyProtein);
  const [remainingFats, setRemainingFats] = useState(dailyFats);
  const [remainingCarbs, setRemainingCarbs] = useState(dailyCarbs);

  useEffect(() => {
    const fetchRecentFoods = async () => {
      try {
        const authToken = localStorage.getItem('authToken');  // Retrieve auth token

        const response = await fetch(`http://127.0.0.1:8000/api/recent_foods/`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recent foods");
        }

        const data = await response.json();
        console.log("API Response:", data); 
        setRecentFoods(data.recent_foods);

        let totalCalories = dailyCalories;
        let totalProtein = dailyProtein;
        let totalFats = dailyFats;
        let totalCarbs = dailyCarbs;

        data.recent_foods.forEach(food => {
          const calories = food.nutritional_info.find(n => n.name === "calories")?.value || 0;
          const protein = food.nutritional_info.find(n => n.name === "protein")?.value || 0;
          const fat = food.nutritional_info.find(n => n.name === "fat")?.value || 0;
          const carbs = food.nutritional_info.find(n => n.name === "carbohydrates")?.value || 0;

          // Subtract from totals but ensure they don't go below 0
          totalCalories = Math.max(0, totalCalories - calories);
          totalProtein = Math.max(0, totalProtein - protein);
          totalFats = Math.max(0, totalFats - fat);
          totalCarbs = Math.max(0, totalCarbs - carbs);
        });

        setRemainingCalories(totalCalories);
        setRemainingProtein(totalProtein);
        setRemainingFats(totalFats);
        setRemainingCarbs(totalCarbs);

        if (totalCalories === 0) alert("Calorie limit reached! You can't consume more calories.");
        if (totalProtein === 0) alert("Protein limit reached! You can't consume more protein.");
        if (totalFats === 0) alert("Fat limit reached! You can't consume more fats.");
        if (totalCarbs === 0) alert("Carb limit reached! You can't consume more carbohydrates.");

      } catch (error) {
        console.error("Error fetching recent foods:", error);
      }
    };

    fetchRecentFoods();
  }, [dailyCalories, dailyProtein, dailyFats, dailyCarbs, recentFoods.length]);

  return (
    <div className='body'>
      <div className='calories'>
        <div className='text'>
            <h2>{remainingCalories}</h2>
            <p>Calories left</p>
        </div>
        <SiGreasyfork style={{fontSize : '40px'}}/>
      </div>
      <div className="nutrition">
        <div className='protein'>
        <h6>{remainingProtein} </h6>
          <p>Protein left</p>
          <AiFillThunderbolt style={{fontSize: '40px'}}/>
        </div>
        <div className='carbs'>
            <h6>{remainingCarbs} </h6>
            <p>Carbs left</p>
            <PiGrains style={{fontSize: '40px'}}/>
        </div>
        <div className='fat'>
            <h6>{remainingFats} </h6>
            <p>Fats left</p>
            <IoMdWater style={{fontSize: '40px'}}/>
        </div>

        
      </div>
      <div className='recent'>
          <h3>Recently eaten</h3>
          <div className='history'>
            {recentFoods.length > 0 ? (
              recentFoods.map((food, index) => {
                const calorieInfo = food.nutritional_info.find(nutrient => nutrient.name === "calories");

                return (
                  <li key={index}>
                    {food.label} - {calorieInfo ? `${calorieInfo.value} kcal` : "Data not available"}
                  </li>
                );
              })
            ) : (
              <p>No food records for today.</p>
            )}

          </div>
        </div>
    </div>
  )
}
