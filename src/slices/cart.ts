import { createSlice } from "@reduxjs/toolkit";
import { productModel } from "../components/interfaceModels/productModel";
import { toast } from "react-toastify";

const CartSlice = createSlice({
  name: "cart",
  initialState: [] as productModel[],
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        // If the product exists, increase its quantity
        existingProduct.quantity += 1;
      } else {
        // If the product doesn't exist, add it with an initial quantity of 1
        state.push({ ...action.payload, quantity: 1 });
      }
      toast.success("Product Addedd Successfully.");
    },
    increaseQuantity: (state, action) => {
      state.forEach((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
          toast.success(`Quantity increased to ${item.quantity} Successfully.`);
        }
      });
    },
    decreaseProduct: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1; // Decrease quantity
          toast.success(
            `Quantity deccreased to ${state[index].quantity} Successfully!`
          );
        } else {
          // If the quantity is 1, remove the product entirely
          state.splice(index, 1);
          toast.success("Product Deleted Successfully!");
        }
      }
    },
    deleteItem: (state, action) => {
      toast.success("Product DeletedSuccessfully!");
      return state.filter((item) => item.id !== action.payload.id);
    },
    set: (_, action) => {
      return action.payload;
    },
    reset: () => {
      return [];
    },
  },
});

export const {
  addProduct,
  decreaseProduct,
  increaseQuantity,
  deleteItem,
  set,
  reset,
} = CartSlice.actions;
export default CartSlice.reducer;
