import React, { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import useCategoriesFirstProduct from "../../../utils/getCategories";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [state, setState] = useState<JSX.Element | null>(null);
  const products = useCategoriesFirstProduct();
  const srcvalue = (event: React.MouseEvent<HTMLImageElement>) => {
    setState(
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center">
        <div className="relative w-[750px] max-h-[600px] flex justify-end">
          <span
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 cursor-pointer"
            onClick={() => {
              setState(null);
            }}
          >
            <ImCross />
          </span>
          <img
            src={`${event.currentTarget.src}`}
            alt="img"
            className="object-cover"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#232323] text-white text-sm relative">
      {state}
      <div className="grid gap-4 w-[86%] mx-auto py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col justify-between">
          <h1 className="flex items-center mb-8 text-lg relative text-indigo-500">
            <span className="mr-2 text-indigo-500">
              <FaCartShopping />
            </span>
            Click Shop
          </h1>
          <p className="mb-2">
            Click Shop is a dynamic e-commerce platform offering a wide range of
            products, from electronics to fashion. Known for seamless shopping
            experiences, fast delivery, and excellent customer service.
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="mb-3 text-lg">Categories</h2>
          {products.map((item, index) => (
            <Link
              key={index}
              to={`/products/${item.category.name}`}
              className="mb-2 hover:text-secondary-color hover:text-indigo-500 transition-all transition-duration: 150ms;"
            >
              {item.category.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="mb-3 text-lg ">Gallery</h2>
          <div className="grid grid-cols-3 gap-1 max-w-[220px]">
            {products.map((item, index) => (
              <img
                src={item.category.image}
                onClick={srcvalue}
                alt="image"
                key={index}
                className="w-[70px] h-[60px] cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="mb-3 text-lg">Contact</h2>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mb-2 hover:text-secondary-color hover:text-indigo-500 transition-all transition-duration: 150ms;"
          >
            <HiOutlineLocationMarker className="text-secondary-color mr-1 text-xl" />
            Location
          </a>
          <a className="flex items-center mb-2 hover:text-secondary-color hover:text-indigo-500 transition-all transition-duration: 150ms;">
            <BsTelephone className="text-secondary-color mr-1 text-xl" />
            +048xxxxx
          </a>
          <a
            href="mailto:your-email@example.com"
            className="flex items-center mb-2 hover:text-indigo-500 transition-all transition-duration: 150ms;"
          >
            <HiOutlineMail className="text-secondary-color mr-1 text-xl" />
            example@email.com
          </a>
        </div>
      </div>
      <div className="bg-[#141414] py-6 text-center text-sm text-gray-500">
        <p>
          Copyright ©2024 All rights reserved | This template is made by
          <Link
            className="font-bold ml-2"
            to="https://www.linkedin.com/in/alaaayyaad001/"
          >
            Alaa_Ayaad
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
