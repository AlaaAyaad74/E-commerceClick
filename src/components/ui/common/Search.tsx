import { useState } from "react";
import { useDispatch } from "react-redux";

import { setData } from "../../../slices/productsSlice";

function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleSearch = (value: string) => {
    dispatch(setData(value));
  };
  return (
    <div
      data-aos="fade-up"
      className="absolute  right-[70px] top-[40px] rounded-md  z-10 p-1 shadow-md  shadow-indigo-400 bg-slate-100"
    >
      <input
        type="text"
        value={input}
        className="rounded-md bg-white ring-1 ring-indigo-500"
        placeholder="Search for Product"
        onChange={(e) => {
          const value = e.target.value;
          setInput(e.target.value);
          console.log(value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}

export default Search;
