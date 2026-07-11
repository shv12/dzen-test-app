"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { productsSelector } from "@/app/lib/redux/selectors";
import { ProductRow } from "@/app/[lang]/components/ProductRow";
import { api } from "@/app/lib/api";
import { setProducts } from "@/app/lib/redux/productsSlice";

export default function ProductsList() {
  const { products } = useAppSelector(productsSelector);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const productType = searchParams.get("productType");
  const filteredProducts = products.filter((product) => (product.productType == productType || productType == undefined));

  useEffect(() => {
    const abortController = new AbortController();
    const fetchProducts = async () => {
      try {
        const result = await api.get("/api/products", { signal: abortController.signal });
        // console.log("ProductsList :: fetchProducts :: result.data", result.data);
        dispatch(setProducts(result.data.products));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("ProductsList :: Request was canceled");
        } else {
          console.error("ProductsList :: ERROR :: ", err);
        }
      } finally {

      }
      setIsLoaded(true);
    }
    fetchProducts();
    return () => {
      abortController.abort();
    };
  },  [dispatch]);

  return <table className="table table-gapped align-middle">
    <tbody>
      {filteredProducts.map((product) => <ProductRow
        key={ product.id}
        product={product}
      />)}
    </tbody>
  </table>;
}