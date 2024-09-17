import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, reset } from "../slices/cart";
import { RootState } from "../store";
import { productModel } from "../components/interfaceModels/productModel";

const useLoadCart = (userEmail: string | null) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    // Only load cart if user is logged in and cartData is empty
    console.log("hggasdafua");
    if (userEmail && cartData.length === 0) {
      const existingCart = JSON.parse(
        localStorage.getItem(`cart_${userEmail}`) || "[]"
      );
      console.log(existingCart);
      if (existingCart.length > 0) {
        existingCart.forEach((item: productModel) => {
          dispatch(addProduct(item));
        });
      }
    }
  }, []);
  // reset when you logout
  useEffect(() => {
    if (!userEmail) {
      dispatch(reset());
    }
  }, [dispatch, userEmail]);
};

export default useLoadCart;
