import { IUser, userObj } from "../../models/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isAuth: boolean;
  token: string | null;
  showSidebar: boolean;
  user: IUser;
  list: "row" | "col"
}

const initialState: AppState = {
  isAuth: false,
  token: null,
  showSidebar: true,
  user: Object.assign({}, userObj),
  list: "row",
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
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    setList: (state, action: PayloadAction<"row" | "col">) => {
      state.list = action.payload
    },
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload
    }
  },
});

// Action creators
export const { login, logout, toggleSidebar, setList, setUser } = appSlice.actions;

export default appSlice.reducer;
