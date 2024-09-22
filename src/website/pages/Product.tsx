import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { AppDispatch, RootState } from "../../store";

import { useParams } from "react-router-dom";
import ProductOverview from "../../components/ui/ProductOverview";
import fetchSingleProduct from "../../api/FetchSingleProduct";

import ProductSkeleton from "../../components/ui/skeleton/ProductSkeleton";


function Products() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.productPage
  );

  useEffect(() => {
    dispatch(
      fetchSingleProduct(`https://api.escuelajs.co/api/v1/products/${id}`)
    );
  }, [dispatch, id]);

  return (
    <>
      {loading && <ProductSkeleton />}
      {data && <ProductOverview />}
      {error && <p>{error}</p>}
    </>
  );
}

export default Products;
