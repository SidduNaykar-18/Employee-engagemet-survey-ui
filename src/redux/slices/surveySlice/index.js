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
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const getAllSurveys = createAsyncThunk(
  "survey/getAllSurveys",
  async (surveyId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/response?survey-id=${surveyId}`);
      console.log("check reponce dtaa=====",response?.data);
      return response?.data;
      
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetching All Questions
export const getAllQuestions = createAsyncThunk(
  "survey/getAllQuestions",
  async (surveyId, { rejectWithValue }) => {
    try {
      const response = await  axiosInstance.get(`/questions?survey-id=${surveyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      radioResponse: null,
      sliderResponse1: null,
      sliderResponse2: null,
    },
    recognitionSupport: {
      radioResponse: null,
      sliderResponse1: null,
      sliderResponse2: null,
    },
    developmentGrowth: {
      radioResponse: null,
      sliderResponse1: null,
      sliderResponse2: null,
    },
    workEnvironmentRelationships: {
      radioResponse: null,
      inputResponse1: null,
      inputResponse2: null,
    },
    overallSatisfactionEngagement: {
      radioResponse: null,
      sliderResponse1: null,
      sliderResponse2: null,
    },
  },
  reducers: {
    updateSurveyData: (state, action) => {
      const { section, dataKey, dataValue } = action.payload;
      state[section][dataKey] = dataValue;
    },
    resetSurveyData: (state) => {
      state.resources = {
        radioResponse: null,
        sliderResponse1: null,
        sliderResponse2: null,
      };
      state.recognitionSupport = {
        radioResponse: null,
        sliderResponse1: null,
        sliderResponse2: null,
      };
      state.developmentGrowth = {
        radioResponse: null,
        sliderResponse1: null,
        sliderResponse2: null,
      };
      state.workEnvironmentRelationships = {
        radioResponse: null,
        inputResponse1: null,
        inputResponse2: null,
      };
      state.overallSatisfactionEngagement = {
        radioResponse: null,
        sliderResponse1: null,
        sliderResponse2: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Add Survey
    builder.addCase(addSurvey.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addSurvey.fulfilled, (state, action) => {
      state.loading = false;
      state.surveys.push(action.payload.data);
    });
    builder.addCase(addSurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    });

    // Get All Surveys
    builder.addCase(getAllSurveys.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllSurveys.fulfilled, (state, action) => {
      state.loading = false;
      state.surveys = action.payload.data;
    });
    builder.addCase(getAllSurveys.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get All Questions
    builder.addCase(getAllQuestions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload.data;
    });
    builder.addCase(getAllQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { updateSurveyData, resetSurveyData } = surveySlice.actions;
export default surveySlice.reducer;
