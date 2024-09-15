import { useDispatch } from "react-redux";
import { addProduct } from "../../slices/cart";
import { productModel } from "../interfaceModels/productModel";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductsList({
  products,
}: {
  products: productModel[];
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Recently Added
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.slice(5, 21).map((product: productModel) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  //   alt={product.imageAlt}
                  src={product.images[0]}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 ">
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
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-base font-medium text-gray-900  ">
                  {product.price}$
                </p>
              </div>
              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    dispatch(addProduct(product));
                    toast.success("Product Added Successfuly!");
                  } else {
                    navigate("/login");
                  }
                }}
                className="mt-1 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
