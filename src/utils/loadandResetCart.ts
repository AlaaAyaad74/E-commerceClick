import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, reset } from "../slices/cart";
import { RootState } from "../store";
import { productModel } from "../components/interfaceModels/productModel";

const useLoadCart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state: RootState) => state.cart);
  const userEmail = useSelector((state: RootState) => state.user.email);

  useEffect(() => {
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
  }, [userEmail]);
  // reset when you logout
  useEffect(() => {
    if (!userEmail) {
      dispatch(reset());
    }
  }, [dispatch, userEmail]);
};

export default useLoadCart;
