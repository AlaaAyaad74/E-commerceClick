import { useDispatch, useSelector } from "react-redux";
import fetchData from "../api/FetchData";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import "react-toastify/dist/ReactToastify.css";
import ProductsList from "../components/ui/ProductsLists";
import { fetchUserData } from "../api/FetchUserData";
import Loading from "../components/ui/Loading";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchData("https://api.escuelajs.co/api/v1/products"));
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      {data && !loading && (
        <main>
          <ProductsList products={data.slice(2,14)} />
        </main>
      )}
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
