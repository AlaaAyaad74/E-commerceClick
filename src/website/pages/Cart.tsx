import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchUserData } from "../../api/FetchUserData";
import { productModel } from "../../components/interfaceModels/productModel";

function Cart() {
  // const cartData = JSON.parse();
  const cartData = useSelector(
    (state: RootState) => state.cart as productModel[]
  );
  // const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const cartReduced = cartData.reduce(
    (acc: productModel[], cur: productModel) => {
      const existProduct = acc.find((item) => item.id === cur.id);
      if (existProduct) {
        existProduct.quantity += 1;
      } else {
        const newProduct = { ...cur, quantity: 1 };
        acc.push(newProduct);
      }
      return acc;
    },
    []
  );
  console.log(cartReduced);
  useEffect(() => {
    dispatch(fetchUserData());
    // dispatch()
  }, [dispatch]);
  console.log(cartReduced);
  return (
    <div className="flex w-11/12 mx-auto mt-4">
      <div className="w-3/4">
        {cartReduced.map((item) => (
          <>
            {console.log(item.quantity)}
            <div className="card relative flex p-3 justify-between align-center">
              <div className="flex gap-4">
                <img
                  src={item.category.image}
                  alt="productImage"
                  className="w-[100px] rounded-md"
                />
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  // onClick={() => {
                  //   item.quantity + 1;
                  // }}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button>-</button>
              </div>
              <span>X</span>
            </div>
          </>
        ))}
      </div>
      <div className="w-1/4">
        <h1>Order Summary</h1>
        <p>subTotal: </p>
        <button
          // onClick={}
          className="mt-1 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
