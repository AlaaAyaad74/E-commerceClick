import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import useLoadCart from "../../utils/loadandResetCart";
import { useEffect } from "react";
import { fetchUserData } from "../../api/FetchUserData";
import useHandleCart from "../../utils/handleCart";

export default function ProductOverview() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.productPage.data);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  const userEmail = useSelector((state: RootState) => state.user.email);
  const { handleAddCart } = useHandleCart(userEmail);

  useLoadCart();
  if (data.category) {
    return (
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li className="text-sm">
                <a
                  href={data.title}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                ></a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                alt={data.images[0]}
                src={data.images[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  alt={data.images[0]}
                  src={data.images[0]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  alt={data.images[1]}
                  src={data.images[1]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                alt={data.images[2]}
                src={data.images[2]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {data.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {data.price} $
              </p>

              <button
                onClick={() => {
                  handleAddCart(data);
                }}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{data?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
