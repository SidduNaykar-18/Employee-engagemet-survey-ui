import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutPage from "../components/Layout";

import LandingPage from "../pages/LandingPage";
import SuccessComponent from "../components/CustomSuccess";
import FinalSurvey from "../components/Finalsurvey";
import FailedComponent from "../components/Failed";
import SubmissionFailedComponent from "../components/SubmissionFailed";
import LoginPage from "../pages/loginPage";


const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to update authentication status
  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Routes>
      <Route path="/employee-engagement" element={<LandingPage />} />
      <Route path="/employee-engagement/survey" element={<LayoutPage />} />
      <Route path="employee-engagement/thank-you" element={<SuccessComponent />} />
      <Route path="employee-engagement/already-submitted" element={<FailedComponent />} />
      <Route path="employee-engagement/failed-submission" element={<SubmissionFailedComponent />} />
      
      <Route
        path="employee-engagement/final-survey"
        element={isAuthenticated ? <FinalSurvey /> : <Navigate to="/employee-engagement/login" />}
      />
      
      <Route
        path="employee-engagement/login"
        element={<LoginPage onLogin={handleLogin} />}
      />
    </Routes>
  );
};

export default AppRoutes;
