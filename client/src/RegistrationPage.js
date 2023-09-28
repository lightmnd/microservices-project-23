import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRegistrationStatus } from "./redux/registerSlice";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrationStatus = useSelector(
    (state) => state.register.registrationStatus
  );

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4008/register", formData);
      if (res.status === 201) {
        dispatch(setRegistrationStatus("Registration succesful"));
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      dispatch(setRegistrationStatus("Registration failed"));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-control"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      {registrationStatus && <p>{registrationStatus}</p>}
      <div
        className={"d-flex flex-column justify-content-start align-items-start"}
      >
        <span className="mt-3">Are you already registered?</span>
        <Link className="btn btn-primary" to="/login">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
