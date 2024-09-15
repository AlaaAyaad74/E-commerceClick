import { useSelector } from "react-redux";
import { RootState } from "../store";
import { productModel } from "../components/interfaceModels/productModel";

const useCategoriesFirstProduct = (): productModel[] => {
  const products = useSelector((state: RootState) => state.products.data);
  // Use a Set to track which categories we've already seen
  const uniqueProducts: productModel[] = [];
  const seenCategories = new Set<string>();
  products.forEach((product: productModel) => {
    if (!seenCategories.has(product.category.name)) {
      uniqueProducts.push(product); // Add the first product for the category
      seenCategories.add(product.category.name); // Mark the category as seen
    }
  });

  return uniqueProducts;
};
export default useCategoriesFirstProduct;
