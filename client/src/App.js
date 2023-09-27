import React from "react";
import PostCreate from "./PostCreate";
import { LoginPage } from "./LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import Home from "./Home";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-post" element={<PostCreate />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
      {/* <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList /> */}
    </div>
  );
};
export default App;
