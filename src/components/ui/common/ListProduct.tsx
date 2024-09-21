import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { productModel } from "../../interfaceModels/productModel";
import { RootState } from "../../../store";
import Loading from "../Loading";
import { addProduct, set } from "../../../slices/cart";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IoIosWarning } from "react-icons/io";

function ListProduct({ products }: { products: productModel[] }) {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const isLoading = useSelector((state: RootState) => state.products.loading);

  const dispatch = useDispatch();
  const cartData = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    if (cartData?.length > 0)
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartData));
  }, [cartData, userEmail]);
  useEffect(() => {
    if (userEmail?.length > 0) {
      const storedCart = localStorage.getItem(`cart_${userEmail}`);
      if (storedCart) {
        dispatch(set(JSON.parse(storedCart)));
      }
    }
  }, [userEmail, dispatch]);
  const navigate = useNavigate();
  return (
    <div className="relative">
      {isLoading && <Loading />}
      {products.length > 0 && !isLoading && (
        <div className="bg-white ">
          <div className=" grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: productModel) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div className="w-[95%]">
                    <h3 className="text-sm text-gray-700">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex h-[40px] text-ellipsis overflow-hidden"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bottom-14 overflow-hidden"
                        />
                        {product.title}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}$
                  </p>
                </div>
                <button
                  // onClick={() => handleAddCart(product)}
                  onClick={() => {
                    if (userEmail) {
                      dispatch(addProduct(product));
                    } else {
                      toast.error("You Must Login First");
                      navigate("/login");
                    }
                  }}
                  className="text-xs sm:text-base mt-1 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {products.length === 0 && (
        <div className="flex justify-center items-center flex-col text-center my-5 text-red-500 font-bold text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 my-4">
          <IoIosWarning style={{ fontSize: "5rem" }} />
          <h1>Products Not Found!</h1>
        </div>
      )}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-16">
          {/* <h2 className="text-2xl font-bold text-gray-900">
            No products found in {categoryName}
          </h2> */}
        </div>
      )}
    </div>
  );
}

export default ListProduct;
