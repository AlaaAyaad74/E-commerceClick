import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchUserData } from "../../api/FetchUserData";
import { productModel } from "../../components/interfaceModels/productModel";
import {
  decreaseProduct,
  deleteItem,
  increaseQuantity,
  reset,
  set,
} from "../../slices/cart";
import { toast } from "react-toastify";

function Cart() {
  const cartData = useSelector(
    (state: RootState) => state.cart as productModel[]
  );
  const userEmail = useSelector((state: RootState) => state.user.email);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Load cart from localStorage when the user logs in
  useEffect(() => {
    if (userEmail) {
      const storedCart = localStorage.getItem(`cart_${userEmail}`);
      if (storedCart) {
        dispatch(set(JSON.parse(storedCart)));
      }
    }
  }, [userEmail, dispatch]);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    if (cartData.length > 0) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartData));
    } else if (userEmail) {
      localStorage.removeItem(`cart_${userEmail}`); // Only remove cart when explicitly needed
    }
  }, [cartData, userEmail]);

  const total = cartData
    .map((item) => item.quantity * item.price)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      {/* {loading && <Loading />} */}

      {cartData.length > 0 && (
        <div className="flex flex-col w-11/12 mx-auto mt-4 gap-5 lg:flex-row">
          <div className="lg:w-3/4 md:w-4/4 gap-4 flex flex-col">
            {cartData.map((item, index) => (
              <div key={index}>
                <div className="relative flex flex-col md:flex-row  p-3 justify-between align-center bg-slate-200 rouded-md gap-3 rounded-md">
                  <div className="flex gap-4 w-3/4">
                    <img
                      src={item.category?.image}
                      alt="productImage"
                      className="w-[100px] rounded-md"
                    />
                    <div className=" w-3/4 overflow-hidden ">
                      <h1 className="mb-2">{item.title}</h1>
                      <p className="h-[80px] overflow-hidden font-base text-slate-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-1/4 ">
                    <button
                      className="rounded-sm bg-green-500 text-white font-medium w-5 h-8 text-center"
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                    >
                      +
                    </button>
                    <p className="font-bold text-slate-500 text-lg">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => {
                        dispatch(decreaseProduct(item));
                      }}
                      className="rounded-sm bg-red-500 text-white font-medium w-5 h-8 "
                    >
                      -
                    </button>
                  </div>
                  <span
                    className="absolute right-3 top-3 py-1 px-2 bg-red-500 rounded-sm  text-white font-medium  "
                    onClick={() => dispatch(deleteItem(item))}
                  >
                    X
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/4 ">
            <h1>Order Summary</h1>
            {cartData.map((item) => (
              <p key={item.id}>
                {item.title}:<span>{item.quantity * item.price}</span>
              </p>
            ))}
            <p>SubTotal:{total} </p>
            <button
              className="mt-1 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                dispatch(reset());
                toast.success("Checkout, Done!");
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      {cartData.length === 0 && (
        <h1 className="text-center text-lg py-5 font-bold">
          YOU CART IS EMPTY!
        </h1>
      )}
    </>
  );
}

export default Cart;
