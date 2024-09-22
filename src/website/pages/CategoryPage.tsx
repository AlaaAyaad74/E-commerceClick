import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productModel } from "../../components/interfaceModels/productModel";
import { AppDispatch, RootState } from "../../store";
import fetchData from "../../api/FetchData";
import { fetchUserData } from "../../api/FetchUserData";
import ListProduct from "../../components/ui/common/ListProduct";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
function CategoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { categoryName } = useParams();

  useEffect(() => {
    dispatch(fetchData("https://api.escuelajs.co/api/v1/products"));
    dispatch(fetchUserData());
  }, [dispatch]);
  useEffect(() => {
    AOS.init({
      once: true,
    });
    AOS.refresh(); // Refresh AOS to ensure animations are working
  }, []);
  // Get products and filter by category
  let products = useSelector((state: RootState) => state.products.filterdData);

  products = products.filter(
    (product: productModel) => product.category.name === categoryName
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2
        data-aos="fade-down"
        data-aos-delay="500"
        className="text-2xl font-bold tracking-tight text-gray-900 mb-3"
      >
        {categoryName}
      </h2>
      <ListProduct products={products} />
    </div>
  );
}

export default CategoryPage;
