import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";

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
      const response = await axiosInstance.get(
        `/response?survey-id=${surveyId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const getAllQuestions = createAsyncThunk(
  "survey/getAllQuestions",
  async (surveyId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/questions?survey-id=${surveyId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

const surveySlice = createSlice({
  name: "surveyData",
  initialState: {
    surveys: [],
    questions: [],
    loading: false,
    error: null,
    success: false,
    alreadySubmitted: false,
    submissionFailed: false,
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
      state.success = false;
      state.alreadySubmitted = false;
      state.submissionFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSurvey.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.alreadySubmitted = false;
      state.submissionFailed = false;
    });
    builder.addCase(addSurvey.fulfilled, (state, action) => {
      state.loading = false;
    
      // Check the message in the response
      if (action.payload.message === 'Sorry, You have already Submitted') {
        state.alreadySubmitted = true;
        state.success = false;
        state.submissionFailed = false;
      } else if (action.payload.message === 'response saved successfully') {
        state.surveys.push(action.payload);
        state.success = true;
        state.alreadySubmitted = false;
        state.submissionFailed = false;
      } else {
        state.success = false;
        state.alreadySubmitted = false;
        state.submissionFailed = true;
      }
    });
    
    builder.addCase(addSurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
      state.success = false;
      if (state.error?.message === "Sorry, You have already Submitted") {
        state.alreadySubmitted = true;
        state.submissionFailed = false;
      } else {
        state.submissionFailed = true;
        state.alreadySubmitted = false;
      }
    });

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
