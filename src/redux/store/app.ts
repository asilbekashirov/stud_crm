import { IUser, userObj } from "../../models/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAlert {
  show: boolean
  text: string
  type: "error" | "success" | "info" | "warning"
}

export interface AppState {
  isAuth: boolean;
  token: string | null;
  user: IUser;
  alert: IAlert
}

const initialState: AppState = {
  isAuth: false,
  token: null,
  user: Object.assign({}, userObj),
  alert: {
    show: false,
    text: "",
    type: "info"
  }
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{accessToken: string, user: IUser}>) => {
      state.isAuth = true;
      state.token = action.payload.accessToken
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.user = Object.assign({}, userObj)
    },
    showAlert: (state, action: PayloadAction<IAlert>) => {
      state.alert = action.payload
    },
    hideAlert: (state) => {
      state.alert = {
        show: false,
        text: "",
        type: "info"
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, showAlert, hideAlert } = appSlice.actions;

export default appSlice.reducer;
