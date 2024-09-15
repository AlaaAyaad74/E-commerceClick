import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ILoguser } from "../components/interfaceModels/userModel";
import IsAvailable from "./Emailisavailable";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (data: ILoguser, thunkAPI) => {
    try {
      if (!IsAvailable(data.email)) {
        return thunkAPI.rejectWithValue("This Email not Have an Account");
      } else {
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/auth/login",
          data
        );
        const token = response.data.access_token;

        localStorage.setItem("token", token);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // console.log("Email or Password Incorrect");
        return thunkAPI.rejectWithValue(err.response?.data);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);
