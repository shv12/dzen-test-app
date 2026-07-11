"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/lib/hooks";
import { setInitialOrders } from "@/app/lib/redux/ordersSlice";
import { setProductTypes } from "@/app/lib/redux/productTypesSlice";
import { setProductsCount } from "@/app/lib/redux/productsSlice";
import { api } from "@/app/lib/api";

export default function DataInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchInitData = async () => {
        try {
          const response = await api.get("/api/orders");
          const { orders, productTypes, productsCount } = response.data;
          console.log("DataInitializer :: fetchInitData :: orders", orders);
          dispatch(setInitialOrders(orders));
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