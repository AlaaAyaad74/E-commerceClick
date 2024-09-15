import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const IsAvailable = createAsyncThunk(
  "email/isAvailable",
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/is-available",
        { email }
      );
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export default IsAvailable;
