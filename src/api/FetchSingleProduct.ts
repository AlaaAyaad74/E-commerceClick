import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productModel } from "../components/interfaceModels/productModel";

const fetchSingleProduct = createAsyncThunk<productModel, string>(
  "product/fetch",
  async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  }
);

export default fetchSingleProduct;
