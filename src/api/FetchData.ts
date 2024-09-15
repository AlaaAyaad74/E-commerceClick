import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productModel } from "../components/interfaceModels/productModel";

const fetchData = createAsyncThunk<productModel[], string>(
  "products/fetch",
  async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  }
);

export default fetchData;
