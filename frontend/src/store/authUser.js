import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggoingOut: false,
  isSigninIn: false,

  //! 1-Function To Sign Up:
  signUp: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/sign-up", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("User Sign Up Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Sign Up Failed");
      set({ isSigningUp: false, user: null });
    }
  },

  //! 2-Function To Check Authentication:
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/auth-check");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
      // toast.error(error.response.data.message || "An error occurred");
    }
  },

  //! 3-Function To Log Out:
  logOut: async () => {
    set({ isLogginOut: true });
    try {
      await axios.post("/api/v1/auth/log-out");
      set({ user: null, isLogginOut: false });
      toast.success("User Logged Out Successfully");
    } catch (error) {
      set({ isLogginOut: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  //! 4-Function To Sign In:
  signIn: async (credentials) => {
    set({ isSigninIn: true });
    try {
      const response = await axios.post("/api/v1/auth/sign-in", credentials);
      set({ user: response.data, isSigninIn: false });
      // console.log('cuerrentUser:', response.data)
      toast.success("User Sign In Successfully");
    } catch (error) {
      set({ isSigninIn: false, user: null });
      toast.error(error.response.data.message || "Sign In Failed");
    }
  },
}));
