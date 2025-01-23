import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomFormField from "../Customfield/custom_form_field";
import "../../style/register.css";
import axios from "axios"; 


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password : "",
    height: "",
    weight: "",
    gender: "male",
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    console.log("User Data:", formData);

    try{
      // Send POST request to backend
      const response = await axios.post('http://localhost:8000/api/register/', formData, {headers: {
        "Content-Type": "application/json"
      }});

      // If successful, navigate to login page and pass the user data
      console.log('User registered:', response.data);

      const profileResponse = await axios.post('http://localhost:8000/api/user-profile/', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log('User profile saved:', profileResponse.data);
  

      // Navigate to the Nutrition page and pass user data
      navigate("/login", { state: formData });
    }catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div id="register-box">
        <h1 id="title"><span id="re">Re</span>gistration</h1>
        <div className="row-field">
          <CustomFormField label="Full Name" name="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} />
          <CustomFormField label="Username" name="username" type="text" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="row-field">
          <CustomFormField label="Email" name="email" type="text" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          <CustomFormField label="Password" name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>
        </div>
        <div className="row-field">
          <CustomFormField label="Height (cm)" name="height" type="number" placeholder="Enter your height" value={formData.height} onChange={handleChange} />
          <CustomFormField label="Weight (kg)" name="weight" type="number" placeholder="Enter your weight" value={formData.weight} onChange={handleChange} />
        </div>
        <div className="gender-field">
          <p>Gender</p>
          <div id="gender">
            <label>
              <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
            </label>
            <label>
              <input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleChange} /> Other
            </label>
          </div>
        </div>
        <div id="reg-button">
          <input id="login-button" type="submit" value="Register" />
        </div>
      </div>
    </form>
  );
};

export default Register;
