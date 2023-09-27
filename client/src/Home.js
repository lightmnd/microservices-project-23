import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <>
          <h2>Welcome, {user.username}!</h2>
          <Link to="/add-post" />
        </>
      ) : (
        <>
          <Link to="/login" />
          <Link to="/register" />
        </>
      )}
    </div>
  );
};

export default Home;
