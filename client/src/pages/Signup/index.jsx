import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the input (you can use validator.js here)
    if (
      !formData.email ||
      !formData.password ||
      formData.password !== formData.confirmPassword
    ) {
      alert("Please fill in all fields and ensure the passwords match.");
      return;
    }

    try {
      const response = await axios.post("/users/signup", formData);

      if (response.status === 200) {
        alert("Sign-up successful!");
      } else {
        const data = response.data;
        alert(`Sign-up failed: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during sign-up.");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <br />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <br />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
