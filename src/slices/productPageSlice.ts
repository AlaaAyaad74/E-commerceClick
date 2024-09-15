import { createSlice } from "@reduxjs/toolkit";
import { productModel } from "../components/interfaceModels/productModel";

import fetchSingleProduct from "../api/FetchSingleProduct";
const initialState = {
  loading: false,
  data: {} as productModel,
  error: "",
};
const productPageSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
      console.log(state.data)
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.data = <productModel>{};
      state.error = action.error.message || "This Data Not Found";
    });
  },
});
export default productPageSlice.reducer;
