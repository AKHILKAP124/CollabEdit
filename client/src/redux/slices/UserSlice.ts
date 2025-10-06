/*************  ✨ Windsurf Command ⭐  *************/
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  user: {
    _id: string;
    fullname: string;
    email: string;
    avatar: string;
  } | null,
  otp?: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  otp: '',
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    SetOTP: (state, action) => {
      state.otp = action.payload;
    },
    ClearOTP: (state) => {
      state.otp = '';
    }
  },
});

export const { login, logout, SetOTP, ClearOTP } = userSlice.actions;

export default userSlice.reducer;