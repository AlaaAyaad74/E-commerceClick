import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/userSlice";

import useCategoriesFirstProduct from "../../utils/getCategories";
import { Link } from "react-router-dom";

import { RootState } from "../../store";
export default function Example() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const products = useCategoriesFirstProduct();
  const cartData = useSelector((state: RootState) => state.cart);
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex flex-wrap space-x-8 px-4">
                  {products.map((item, index) => (
                    <Tab
                      key={index}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {item.category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {products.map((product, index) => (
                  <TabPanel key={index} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="grid grid-cols-2 gap-x-4">
                      {products.map((item, index) =>
                        item.category.name === product.category.name ? (
                          <div key={index} className="group relative text-sm">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <img
                                alt="product Image"
                                src={item.category.image}
                                className="object-cover object-center"
                              />
                            </div>
                            <Link
                              to={`/products/${product.category.name}`}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 z-10"
                              />
                              {item.category.name}
                            </Link>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                {!user.token ? (
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(login({ data: {}, token: "" }));
                    }}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Logout
                  </button>
                )}
              </div>
              <div className="flow-root">
                <Link
                  to="/register"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  {user.token ? "" : "Create account"}
                </Link>
                <div>
                  {user.token && (
                    <img
                      src={user.avatar}
                      alt="profile image"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img alt="" src="/assets/logo.png" className="h-8 w-auto" />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {products.map((product, index) => (
                    <Popover key={index} className="flex">
                      <div className="relative flex">
                        <Link
                          to={`/products/${product.category.name}`}
                          className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600"
                        >
                          {product.category.name}
                        </Link>
                      </div>
                    </Popover>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!user.token ? (
                    <a
                      href="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        dispatch(login({ data: {}, token: "" }));
                      }}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Logout
                    </button>
                  )}
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a
                    href="/register"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {user.token ? "" : "Create account"}
                  </a>
                  <div>
                    {user.token && (
                      <img
                        src={user.avatar}
                        alt="profile image"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartData.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
