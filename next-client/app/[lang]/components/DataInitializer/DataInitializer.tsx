"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/lib/hooks";
import { setInitialOrders } from "@/app/lib/redux/ordersSlice";
import { setProductTypes } from "@/app/lib/redux/productTypesSlice";
import { setProductsCount } from "@/app/lib/redux/productsSlice";
import { api } from "@/app/lib/api";
import { useSearchParams } from "next/navigation";

export default function DataInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();
  const currentOrderID = searchParams.get("orderID");

  useEffect(() => {
    const fetchInitData = async () => {
        try {
          const response = await api.get("/api/orders");
          const { orders, productTypes, productsCount } = response.data;
          console.log("DataInitializer :: fetchInitData :: orders", orders);
          dispatch(setInitialOrders({
            orders,
            currentOrderID: currentOrderID === null ? null : parseInt(currentOrderID)
          }));
          dispatch(setProductTypes(productTypes));
          dispatch(setProductsCount(productsCount));
        } catch (err) {
          console.error("Failed loading startup state", err);
        } finally {
          setIsLoaded(true);
        }
    }

    fetchInitData();
  }, [dispatch]);
// Show a standard Bootstrap global spinner until data hits Redux
  if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary app__spinner" role="status">
          <span className="visually-hidden">Loading system configuration...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}