import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/authSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isError, setIsError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4008/login", formData);

      if (res.status === 200) {
        dispatch(login(formData));
        localStorage.setItem("user", JSON.stringify(formData));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsError(error);
      dispatch(login("Login failed"));
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2>Login</h2>
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
        {!!isError && <p>{"Wrong username or password"}</p>}
        <div
          className={
            "d-flex flex-column justify-content-start align-items-start"
          }
        >
          <span className="mt-3">new on Social App?</span>
          <Link className="btn btn-primary" to="/register">
            Go to Signup
          </Link>
        </div>
      </div>
    </>
  );
};
