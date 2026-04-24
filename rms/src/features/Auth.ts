import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    fullName: string;
    profileImage: string;
    role?: string;
  } | null;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
  },
  reducers: {
    login: (
      state: AuthState,
      action: PayloadAction<{
        token: string;
        fullName: string;
        profileImage: string;
        role: string;
      }>,
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = {
        fullName: action.payload.fullName,
        profileImage: action.payload.profileImage,
      };
    },

    logout: (state: AuthState) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },

    // updateProfile: (
    //   state,
    //   action: PayloadAction<{ profileImage?: string; name: string }>,
    // ) => {
    //   if (state.user) {
    //     state.user = { ...state.user, ...action.payload };
    //   }
    // },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
