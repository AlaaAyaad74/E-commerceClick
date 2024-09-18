import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { productModel } from "../../interfaceModels/productModel";
import { RootState } from "../../../store";
import Loading from "../Loading";
import { addProduct, set } from "../../../slices/cart";
import { useEffect } from "react";

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
  return (
    <>
      {isLoading && <Loading />}
      {products.length > 0 && !isLoading && (
        <div className="bg-white ">
          <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex h-[40px] text-ellipsis overflow-hidden"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bottom-14"
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
                  onClick={() => dispatch(addProduct(product))}
                  className="mt-1 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-16">
          {/* <h2 className="text-2xl font-bold text-gray-900">
            No products found in {categoryName}
          </h2> */}
        </div>
      )}
    </>
  );
}

export default ListProduct;
