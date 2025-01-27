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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    setErrors({});
    console.log("User Data:", formData);

    try{
      
      const response = await axios.post('http://localhost:8000/api/register/', formData, {headers: {
        "Content-Type": "application/json"
      }});

      
      console.log('User registered:', response.data);

      const profileResponse = await axios.post('http://localhost:8000/api/user-profile/', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log('User profile saved:', profileResponse.data);
  

      navigate("/login", { state: formData });
    }catch (error) {
      
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || { general: "An unknown error occurred." });
        
      } else {
        setErrors({ general: "An unknown error occurred." });
      }
    }
  };

  return (
    <div className="registration">
      <form onSubmit={handleRegister}>
      <div id="register-box">
        <h1 id="title">Registration</h1>
        {errors.general && <p className="error-message">{errors.general}</p>}
        <div className="row-field">
          <CustomFormField label="Full Name" name="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} />
          <CustomFormField label="Username" name="username" type="text" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error-message">{errors.username.join(", ")}</p>}
        </div>
        <div className="row-field">
          <CustomFormField label="Email" name="email" type="text" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-message">{errors.email.join(", ")}</p>}
          <CustomFormField label="Password" name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>
          {errors.password && <p className="error-message">{errors.password.join(", ")}</p>}
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
    <footer class="Footer">
            <div class="Footer-links">
                
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
    </div>
  );
};

export default Register;
