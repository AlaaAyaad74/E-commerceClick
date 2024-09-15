import { createSlice } from "@reduxjs/toolkit";
import { productModel } from "../components/interfaceModels/productModel";
import fetchData from "../api/FetchData";
const initialState = {
  loading: false,
  data: [] as productModel[],
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message || "This Data Not Found";
    });
  },
});

export default productsSlice.reducer;
