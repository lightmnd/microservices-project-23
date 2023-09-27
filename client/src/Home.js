import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <Link to="/login" />
      <Link to="/register" />
      <Link to="/add-post" />
    </div>
  );
};

export default Home;
