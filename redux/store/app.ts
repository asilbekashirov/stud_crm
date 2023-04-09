import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  isAuth: boolean,
  token: string | null,
}

const initialState: AppState = {
  isAuth: false,
  token: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
        state.isAuth = true
        state.token = action.payload
    },
    logout: (state) => {
      state.isAuth = false
      state.token = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = appSlice.actions

export default appSlice.reducer