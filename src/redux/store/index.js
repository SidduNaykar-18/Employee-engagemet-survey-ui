import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import surveyReducer from '../slices/surveySlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    surveyData: surveyReducer,
  },
});

export default store;
