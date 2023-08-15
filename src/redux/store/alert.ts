import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAlert {
  alert: {
    show: boolean;
    text: string;
    type: "error" | "success" | "info" | "warning";
  };
}

const initialState: IAlert = {
  alert: {
    show: false,
    text: "",
    type: "info",
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    hideAlert: (state) => {
      state.alert = {
        show: false,
        text: "",
        type: "info",
      };
    },
    successAlert: (state, action: PayloadAction<{ message: string }>) => {
      state.alert = {
        show: true,
        text: action.payload.message,
        type: "success",
      };
    },
    errorAlert: (state, action: PayloadAction<{ message: string }>) => {
      state.alert = {
        show: true,
        text: action.payload.message,
        type: "error",
      };
    },
    infoAlert: (state, action: PayloadAction<{ message: string }>) => {
      state.alert = {
        show: true,
        text: action.payload.message,
        type: "info",
      };
    },
    warningAlert: (state, action: PayloadAction<{ message: string }>) => {
      state.alert = {
        show: true,
        text: action.payload.message,
        type: "warning",
      };
    },
  },
});

// Action creators
export const { successAlert, hideAlert, infoAlert, warningAlert, errorAlert } =
  alertSlice.actions;

export default alertSlice.reducer;
