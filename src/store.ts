import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import productPageSlice from "./slices/productPageSlice";
import cart from "./slices/cart";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    productPage: productPageSlice,
    user: userSlice,
    cart: cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
