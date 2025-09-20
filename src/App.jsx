import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    gender: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName") {
      if (!value.trim()) error = "First name is required";
      else if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
        error ="Must start with capital & contain only letters";
      }
    }

    if (name === "lastName") {
      if (!value.trim()) error = "Last name is required";
      else if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
        error ="Must start with capital & contain only letter";
      }
    }

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Enter a valid email";
    }

    if (name === "gender") {
      if (!value.trim()) error = "Gender is required";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6)
        error = "Password must be at least 6 characters";
      else if (value.length >= 12)
        error = "Password must be under 12 characters";
      else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*]).{6,20}$/.test(value))
        error ="At least one Upper, one Lower, one Special character, one Number";
    }

    if (name === "confirmPassword") {
      if (!value) error = "Please confirm password";
      else if (value !== formData.password) error = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateAll = () => {
    let firstErrorField = null;
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error && !firstErrorField) {
        firstErrorField = field; // capture first invalid field
      }
    });
    return firstErrorField;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstErrorField = validateAll();

    if (firstErrorField) {                            // Focus the first invalid field
      refs[firstErrorField].current.focus();
    } else {
      setFormData({                                   // Reset form if you want
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      refs.firstName.current.focus();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "firstName" || name === "lastName") {
      newValue = newValue.replace(/[^a-zA-Z]/g, ""); // remove numbers & symbols

      if (newValue.length > 0) {
        newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  return (
    <div className="app">
      <h1>REGISTRATION FORM</h1>

      <form className="input-container" onSubmit={handleSubmit} noValidate>

      <div className="input-row">
        <div className="input-container">
          <label htmlFor="firstName">First name <span className="required">*</span></label>
          <input ref={refs.firstName} type="text" id="firstName" name="firstName" placeholder="Enter the first name" value={formData.firstName} onChange={handleChange}
          onBlur={(e) => validateField("firstName", e.target.value)}/>
          <span className="error">{errors.firstName || ""}</span>
        </div>

        <div className="input-container">
          <label htmlFor="lastName">Last name <span className="required">*</span></label>
          <input ref={refs.lastName} type="text" id="lastName" name="lastName" placeholder="Enter the last name" value={formData.lastName} onChange={handleChange}
          onBlur ={(e) => validateField("lastName",e.target.value)}/>
          <span className="error">{errors.lastName || ""}</span>
        </div>
      </div>

      <div className="input-row">
        <div className="input-container">
          <label htmlFor="email">Email <span className="required">*</span></label>
          <input ref={refs.email} type="text" id="email" name="email" placeholder="Enter the email" value={formData.email} onChange={handleChange}
          onBlur = {(e) => validateField("email",e.target.value)}/>
          <span className="error">{errors.email || ""}</span>
        </div>

        <div className="input-container">
          <label htmlFor="gender">Gender <span className="required">*</span></label>
          <select ref={refs.gender} id="gender" name="gender" placeholder="Enter your gender" value={formData.gender} onChange={handleChange}
          onBlur = {(e) => validateField("gender",e.target.value)}>   
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Trans">Trans</option>
          </select>
          <span className="error">{errors.gender || ""}</span>
        </div>
      </div>
      <label htmlFor="password">Password <span className="required">*</span></label>
      <input ref={refs.password} type="password" id="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange}
      onBlur = {(e) => validateField("password",e.target.value)}/>
      <span className="error">{errors.password}</span>

      <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
      <input ref={refs.confirmPassword} type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange}
      onBlur = {(e) => validateField("confirmPassword",e.target.value)}/>
      <span className="error">{errors.confirmPassword}</span>

      <button type="submit">Submit</button>
 </form>

    </div>
  );
}

export default App;
