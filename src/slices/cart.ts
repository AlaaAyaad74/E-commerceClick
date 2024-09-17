import { createSlice } from "@reduxjs/toolkit";
import { productModel } from "../components/interfaceModels/productModel";

const CartSlice = createSlice({
  name: "cart",
  initialState: [] as productModel[],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
      console.log(state, action);
    },
    deleteProduct: (state, action) => {
      state.filter((item) => item.id !== action.payload);
    },
    reset: () => {
      return [];
    },
  },
});
export const { addProduct, deleteProduct, reset } = CartSlice.actions;
export default CartSlice.reducer;
