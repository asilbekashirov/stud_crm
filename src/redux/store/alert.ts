import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAlert {
  show: boolean;
  text: string;
  type: "error" | "success" | "info" | "warning";
}

const initialState: IAlert = {
  show: false,
  text: "",
  type: "info",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    hideAlert: (state) => {
      state = {
        show: false,
        text: "",
        type: "info",
      };
    },
    successAlert: (state, action: PayloadAction<{ message: string }>) => {
      state = {
        show: true,
        text: action.payload.message,
        type: "success",
      };
    },
    errorAlert: (state, action: PayloadAction<{ message: string }>) => {
      state = {
        show: true,
        text: action.payload.message,
        type: "error",
      };
    },
    infoAlert: (state, action: PayloadAction<{ message: string }>) => {
      state = {
        show: true,
        text: action.payload.message,
        type: "info",
      };
    },
    warningAlert: (state, action: PayloadAction<{ message: string }>) => {
        state = {
          show: true,
          text: action.payload.message,
          type: "warning",
        };
      },
  },
});

// Action creators
export const { successAlert, hideAlert, infoAlert, warningAlert, errorAlert } = alertSlice.actions;

export default alertSlice.reducer;
