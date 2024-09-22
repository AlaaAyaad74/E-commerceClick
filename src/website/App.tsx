import { useDispatch, useSelector } from "react-redux";
import fetchData from "../api/FetchData";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import "react-toastify/dist/ReactToastify.css";
import ProductsList from "../components/ui/ProductsLists";
import { fetchUserData } from "../api/FetchUserData";
import Slider from "../components/ui/Slider";
import SkeletonCard from "../components/ui/skeleton/Card";
import SliderSkeleton from "../components/ui/skeleton/SliderSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, filterdData, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchData("https://api.escuelajs.co/api/v1/products"));
    dispatch(fetchUserData());
  }, [dispatch]);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      {loading && (
        <>
          <SliderSkeleton />
          <div className="bg-white ">
            <div className=" grid grid-cols-2 my-5 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        </>
      )}
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
