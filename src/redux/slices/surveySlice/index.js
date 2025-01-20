import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";

// Async Thunks for Adding and Fetching Surveys
export const addSurvey = createAsyncThunk(
  "survey/addSurvey",
  async (surveyData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/response", surveyData);
      return response?.data;
    } catch (error) {
      // Return the error message to the reducer
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);


export const getAllSurveys = createAsyncThunk(
  "survey/getAllSurveys",
  async (surveyId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/response?survey-id=${surveyId}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

// Fetching All Questions
export const getAllQuestions = createAsyncThunk(
  "survey/getAllQuestions",
  async (surveyId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/questions?survey-id=${surveyId}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

// Survey Slice
const surveySlice = createSlice({
  name: "surveyData",
  initialState: {
    surveys: [],
    questions: [],
    loading: false,
    error: null,  
    resources: {
      radioResponse1: null,
      sliderResponse1: null,
      sliderResponse2: null,
    },
    recognitionSupport: {
      radioResponse1: null,
      sliderResponse1: null,
      radioResponse2: null,
    },
    developmentGrowth: {
      radioResponse1: null,
      radioResponse2: null,
      sliderResponse1: null,
      sliderResponse2: null,
    },
    workEnvironmentRelationships: {
      sliderResponse1: null,
      inputResponse1: null,
      inputResponse2: null,
    },
    overallSatisfactionEngagement: {
      sliderResponse1: null,
      sliderResponse2: null,
    },
  },
  reducers: {
    updateSurveyData: (state, action) => {
      const { section, dataKey, dataValue } = action.payload;
      if (state[section]) {
        state[section][dataKey] = dataValue;
      }
    },
    resetSurveyData: (state) => {
      state.resources = {
        radioResponse1: null,
        sliderResponse1: null,
        sliderResponse2: null,
      };
      state.recognitionSupport = {
        radioResponse1: null,
        sliderResponse: null,
        radioResponse2: null,
      };
      state.developmentGrowth = {
        radioResponse1: null,
        radioResponse2: null,
        sliderResponse1: null,
        sliderResponse2: null,
      };
      state.workEnvironmentRelationships = {
        sliderResponse1: null,
        inputResponse1: null,
        inputResponse2: null,
      };
      state.overallSatisfactionEngagement = {
        sliderResponse1: null,
        sliderResponse2: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Add Survey
    builder.addCase(addSurvey.pending, (state) => {
      state.loading = true;
      state.error = null;  // Clear any previous error
    });
    builder.addCase(addSurvey.fulfilled, (state, action) => {
      state.loading = false;
      state.surveys.push(action.payload);
      state.error = null;  // Reset error after successful submission
    });
    builder.addCase(addSurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";  // Update error state
    });

    // Get All Surveys
    builder.addCase(getAllSurveys.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllSurveys.fulfilled, (state, action) => {
      state.loading = false;
      state.surveys = action.payload;
    });
    builder.addCase(getAllSurveys.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    });

    // Get All Questions
    builder.addCase(getAllQuestions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    });
    builder.addCase(getAllQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    });
  },
});

export const { updateSurveyData, resetSurveyData } = surveySlice.actions;
export default surveySlice.reducer;
