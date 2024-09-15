import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "../slices/userSlice";

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  "fetch/userData", // Action type
  async (_, thunkAPI) => {
    try {
      // Fetch user details
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach token to request
          },
        }
      );

      // Dispatch login action with user data and token
      thunkAPI.dispatch(
        login({ data: response.data, token: localStorage.getItem("token") })
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      // Handle Axios errors and other unknown errors
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(
          err.response?.data || "Error fetching user data"
        );
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);
