import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
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
import { GrDeliver } from "react-icons/gr";
import CartSkeleton from "../../components/ui/skeleton/CartSkeleton";

function Cart() {
  const cartData = useSelector(
    (state: RootState) => state.cart as productModel[]
  );
  const userEmail = useSelector((state: RootState) => state.user.email);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUserData()).finally(() => setIsLoading(false));
  }, [dispatch]);

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

  let total = cartData
    .map((item) => item.quantity * item.price)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      {isLoading && <CartSkeleton />}

      {cartData.length > 0 && (
        <div className="flex flex-col w-11/12 mx-auto  gap-5 lg:flex-row min-h-[50vh] my-4">
          <div className="lg:w-3/4 md:w-4/4 gap-4 flex flex-col">
            {cartData.map((item, index) => (
              <div key={index} className="animate-[wiggle_1s_ease-in-out]">
                <div className="relative flex flex-col md:flex-row  p-3 justify-between align-center bg-slate-200 rouded-md gap-3 rounded-md">
                  <div className="flex gap-4 w-3/4">
                    <img
                      src={item.images[0]}
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
                    className="absolute right-3 top-3 py-1 px-2 bg-red-500 rounded-sm  text-white font-medium cursor-pointer"
                    onClick={() => dispatch(deleteItem(item))}
                  >
                    X
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/4 ">
            <h1 className="mb-3 font-bold border-b-2 pb-1">Order Summary</h1>
            {cartData.map((item) => (
              <p key={item.id} className="mb-1 text-sm">
                {item.title}:
                <span className="ml-2 text-slate-400 font-bold">
                  {item.quantity * item.price} $
                </span>
              </p>
            ))}
            <p
              className={`flex items-center text-green-500 font-bold ${
                total > 100 ? "line-through	text-red-500 " : (total += 10)
              }`}
            >
              <span className="mr-1">
                <GrDeliver />
              </span>
              Delivery:<span className="ml-2">10 $</span>
            </p>
            <p className="text-lg my-5 border-t-2 font-bold text-teal-400">
              SubTotal:<span className="text-teal-400 ml-2">{total} $</span>
            </p>
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
        <h1 className="text-center text-lg my-5 py-5 font-bold min-h-[50vh]">
          YOU CART IS EMPTY!
        </h1>
      )}
    </>
  );
}

export default Cart;
