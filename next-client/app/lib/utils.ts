import { AppDispatch } from "./store";
import { api } from "./api";
import { deleteProductFromOrder } from "./redux/ordersSlice";
import { deleteOrderProduct } from "@/app/lib/redux/productsSlice";

export const deleteProduct = async (
  productID: number,
  orderID: number,
  priceUAH: number,
  priceUSD: number,
  dispatch: AppDispatch,
  setIsLoading: (loading: boolean) => void,
) => {
  console.log("deleteOrder from utils");
    console.log("utils :: deleteOrder :: productID", productID, "orderID", orderID);
    setIsLoading(true);
    const { data } = await api.post("/api/products/deleteOrderProduct", { productID });
    const { result, success } = data;
    if (success) {
      dispatch(deleteProductFromOrder({
        productID,
        orderID: orderID,
        priceUAH,
        priceUSD
      }));
      dispatch(deleteOrderProduct(productID));
    }
    setIsLoading(false);
}