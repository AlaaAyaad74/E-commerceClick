import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchUserData } from "../../api/FetchUserData";

function Cart() {
  const cartData = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  return (
    <h1>
      {cartData.map((item) => (
        <h1>{item.title}</h1>
      ))}
    </h1>
  );
}

export default Cart;
