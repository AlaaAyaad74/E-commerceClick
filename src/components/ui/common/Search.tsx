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
    <div className="absolute right-[90px] top-[90px]  z-10">
      <input
        type="text"
        value={input}
        className="rounded-md bg-white shadow-md  shadow-slate-400"
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
