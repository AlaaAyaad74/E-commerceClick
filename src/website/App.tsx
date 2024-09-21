import { useDispatch, useSelector } from "react-redux";
import fetchData from "../api/FetchData";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import "react-toastify/dist/ReactToastify.css";
import ProductsList from "../components/ui/ProductsLists";
import { fetchUserData } from "../api/FetchUserData";
import Loading from "../components/ui/Loading";
import Slider from "../components/ui/Slider";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, filterdData, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchData("https://api.escuelajs.co/api/v1/products"));
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      {filterdData && !loading && (
        <main>
          <Slider /> <ProductsList products={filterdData.slice(2, 14)} />
        </main>
      )}
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
