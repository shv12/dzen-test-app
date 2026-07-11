import AppPage from "../components/AppPage/AppPage";
import ProductsTitle from "../components/ProductsTitle/ProductsTitle";
import ProductsList from "../components/ProductsList/ProductsList";

export default function ProductsPage() {
  return <AppPage
    title={<ProductsTitle />}
  >
    <ProductsList />
  </AppPage>;
}