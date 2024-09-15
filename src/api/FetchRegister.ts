import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../components/interfaceModels/userModel";
// import IsAvailable from "./Emailisavailable";

export const FetchRegister = createAsyncThunk(
  "user/register",
  async (data: IUser, thunkAPI) => {
    // console.log(data);
    try {
      /***is this email already have */
      // const valid = await thunkAPI.dispatch(IsAvailable(data.email)).unwrap();
      // console.log(valid);
      // if (!valid.isAvailable) {
      //   return thunkAPI.rejectWithValue(
      //     "This email is already associated with an account."
      //   );
      // } else {
        await axios.post("https://api.escuelajs.co/api/v1/users/", data);
      // }

      // return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);
