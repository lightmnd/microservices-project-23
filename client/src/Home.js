import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user =
    useSelector((state) => state.auth.user) || localStorage.getItem("user");

  return (
    <div className="container mt-5 d-flex flex-column">
      {isAuthenticated ? (
        <>
          <h2>Welcome, {user.username}!</h2>
          <Link className="btn btn-primary" to="/add-post">
            Add New Post
          </Link>
        </>
      ) : (
        <>
          <h2>Welcome to my Social App</h2>
          <Link
            className="btn btn-primary mb-3 mt-3"
            style={{ width: 120 }}
            to="/login"
          >
            Go to Login
          </Link>
          <Link
            className="btn btn-primary"
            style={{ width: 120 }}
            to="/register"
          >
            Go to Signup
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
