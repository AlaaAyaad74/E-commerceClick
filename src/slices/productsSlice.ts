import { createSlice } from "@reduxjs/toolkit";
import { productModel } from "../components/interfaceModels/productModel";
import fetchData from "../api/FetchData";
const initialState = {
  loading: false,
  data: [] as productModel[],
  filterdData: [] as productModel[],
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log("action.payload:", action.payload);
      // console.log(
      //   state.data.filter(
      //     (item) => item.title.toLowerCase() === action.payload.toLowerCase()
      //   )
      // );
      const searchTerm = action.payload.trim().toLowerCase();

      state.filterdData = state.data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
      // state.data.filter(
      //   (item) => item.title.toLowerCase() === action.payload.toLowerCase()
      // );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.filterdData = action.payload;
      state.error = "";
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message || "This Data Not Found";
    });
  },
});
export const { setData } = productsSlice.actions;
export default productsSlice.reducer;
