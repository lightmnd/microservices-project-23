import React from "react";
import PostCreate from "./PostCreate";
import { LoginPage } from "./LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import Home from "./Home";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <div className="container">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-post" element={<PostCreate />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};
export default App;
