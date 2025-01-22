import React from "react";
import { Routes, Route,} from "react-router-dom";
import LayoutPage from "../components/Layout";
import LandingPage from "../pages/LandingPage";
import SuccessComponent from "../components/CustomSuccess";
import FailedComponent from "../components/Failed";
import SubmissionFailedComponent from "../components/SubmissionFailed";
import LoginPage from "../pages/loginPage";
import FinalSurvey from "../components/Finalsurvey";
import ProtectedRoute from "../components/ProtectedRoute";
import ChangePasswordPage from "../pages/ChangePasswordPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/employee-engagement" element={<LandingPage />} />
      <Route path="/employee-engagement/login" element={<LoginPage />} />
      <Route path="/employee-engagement/survey" element={<LayoutPage />} />
      <Route path="/employee-engagement/thank-you" element={<SuccessComponent />} />
      <Route path="/employee-engagement/already-submitted" element={<FailedComponent />} />
      <Route path="/employee-engagement/failed-submission" element={<SubmissionFailedComponent />} />
      <Route path="/employee-engagement/change-password" element={<ChangePasswordPage />} />
      <Route path="/employee-engagement/final-survey" element={<ProtectedRoute><FinalSurvey/></ProtectedRoute> }  />
    </Routes>
  );
};

export default AppRoutes;
