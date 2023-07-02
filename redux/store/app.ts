import { IUser, userObj } from "@/models/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isAuth: boolean;
  token: string | null;
  user: IUser;
}

const initialState: AppState = {
  isAuth: false,
  token: null,
  user: Object.assign({}, userObj),
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
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = appSlice.actions;

export default appSlice.reducer;
