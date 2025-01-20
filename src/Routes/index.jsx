import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutPage from "../components/Layout";

import LandingPage from "../pages/LandingPage";
import SuccessComponent from "../components/CustomSuccess";
import FinalSurvey from "../components/Finalsurvey";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/employee-engagement" element={<LandingPage />} />
      <Route path="/employee-engagement/survey" element={<LayoutPage />}></Route>
      <Route path="employee-engagement/thank-you" element={<SuccessComponent />}></Route>
      <Route path="employee-engagement/final-survey" element={<FinalSurvey/>}></Route>
    </Routes>
  );
};

export default AppRoutes;
