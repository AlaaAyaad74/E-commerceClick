import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "",
  email: "",
  password: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.data.name;
      state.avatar = action.payload.data.avatar;
      state.email = action.payload.data.email;
      state.password = action.payload.data.password;
      state.token = action.payload.token;
      // console.log(action.payload, "Action Pyaload", state.avatar); //this console any the user when i click the login button
    },
    register: (state, action) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.password = action.payload.password;
      console.log(action.payload, "Action Pyaload");
    },
  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
