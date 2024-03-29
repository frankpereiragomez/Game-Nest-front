import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FeedbackPayloadStructure, UiStructure } from "../../types";

export const initialFeedbackState: UiStructure = {
  isLoading: false,
  isError: false,
  showFeedback: false,
  message: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialFeedbackState,
  reducers: {
    showLoading: (currentState: UiStructure): UiStructure => ({
      ...currentState,
      isLoading: true,
    }),
    hideLoading: (currentState: UiStructure): UiStructure => ({
      ...currentState,
      isLoading: false,
    }),
    showFeedback: (
      currentState: UiStructure,
      action: PayloadAction<FeedbackPayloadStructure>
    ): UiStructure => ({
      ...currentState,
      showFeedback: true,
      isError: action.payload.isError,
      message: action.payload.message,
    }),
    hideFeedback: (currentState: UiStructure): UiStructure => ({
      ...currentState,
      showFeedback: false,
      message: "",
      isError: false,
    }),
  },
});

export const {
  showLoading: showLoadingActionCreator,
  hideLoading: hideLoadingActionCreator,
  showFeedback: showFeedbackActionCreator,
  hideFeedback: hideFeedbackActionCreator,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
