import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../slices/cart";
import { productModel } from "../components/interfaceModels/productModel";
import { RootState } from "../store";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useHandleCart = (userEmail: string | null) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const handleAddCart = (product: productModel) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      toast.error("You Must Login First");
      // toast("Product Added");
    } else {
      dispatch(addProduct(product));
      const existingCart = JSON.parse(
        localStorage.getItem(`cart_${userEmail}`) || "[]"
      );
      existingCart.push(product);
      console.log(cartData);
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(existingCart));
      toast.success("Product Added");
    }
  };

  return { handleAddCart };
};

export default useHandleCart;
