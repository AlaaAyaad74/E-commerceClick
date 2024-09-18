import { useDispatch, useSelector } from "react-redux";
import { addProduct, reset } from "../slices/cart";
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
    } else {
      const existProduct = cartData.find((item) => item.id === product.id);
      const existingCart = JSON.parse(
        localStorage.getItem(`cart_${userEmail}`) || "[]"
      );
      if (existProduct) {
        dispatch(reset());
        existingCart.forEach((item: productModel) => {
          if (item.id === product.id) {
            item = { ...item, quantity: (item.quantity += 1) };
            console.log(item);
          }
        });
        existingCart.map((item: productModel) => {
          dispatch(addProduct(item));
          console.log(item);
        });
      } else {
        product = { ...product, quantity: 1 };
        dispatch(addProduct(product));
        existingCart.push(product);
      }
      console.log(cartData);
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(existingCart));
      toast.success("Product Added");
    }
  };

  return { handleAddCart };
};

export default useHandleCart;
