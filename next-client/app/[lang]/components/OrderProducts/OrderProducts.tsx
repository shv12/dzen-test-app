"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsPlusCircleFill } from "react-icons/bs";
import styles from "./OrderProducts.module.css";
import { Order } from "@/app/types/definitions";
import { api } from "@/app/lib/api";
import { useAppDispatch, useAppSelector, useTranslations } from "@/app/lib/hooks";
import { ordersSelector, productsSelector, localeSelector } from "@/app/lib/redux/selectors";
import { setOrderProducts } from "@/app/lib/redux/productsSlice";
import { BiTrash } from "react-icons/bi";
import { deleteProduct } from "@/app/lib/utils";

interface OrderProductsProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderProducts({ order, onClose }: OrderProductsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentOrder } = useAppSelector(ordersSelector);
  const dispatch = useAppDispatch();
  const products = useAppSelector(productsSelector);
  const { locale, dict } = useAppSelector(localeSelector);
  const t = useTranslations(dict);

  const handleAddProduct = () => {
    console.log("OrderProducts :: handleAddProduct :: order", order);
    router.push(`/${locale}/products/add`);
  }

  const handleDelete = async (productID: number, priceUAH: number, priceUSD: number) => {

    await deleteProduct(
      productID,
      currentOrder!.id,
      priceUAH,
      priceUSD,
      dispatch,
      setIsLoading
    );

  }

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchOrderProducts() {
      setIsLoading(true);
      try {
        const {data} = await api.post("/api/products/getOrderProducts", { orderID: currentOrder!.id }, {signal: abortController.signal});
        // console.log("OrderProducts :: useEffect :: data", data);
        if (data.success) {
          dispatch(setOrderProducts(data.result));
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("OrderProducts :: Request was canceled");
        } else {
          console.error("OrderProducts :: ERROR :: ", err);
        }
      } finally {
      setIsLoading(false);
      }
    }
    fetchOrderProducts();
    return () => {
      abortController.abort();
    }
  }, [currentOrder, dispatch]);

  if (isLoading) {
    return <div className="ms-4">{t('loading')}</div>;
  }

  return <div className={`ms-4 border rounded shadow bg-white pb-4 ps-4 grow ${styles.component}`}>
    <header className="position-relative">
      <div className="fw-bold pt-4 pe-4">{currentOrder!.orderName}</div>
      <button
        type="button"
        onClick={onClose}
        aria-label="close"
        className="btn-close app__btn-close"
      ></button>
    </header>
    <button
      type="button"
      onClick={handleAddProduct}
      className="text-green-600"
    ><BsPlusCircleFill size={20} className="d-inline me-2" />{t('addProduct')}</button>
    <div className="pe-4">
      <table className="table table-bordered text-gray-500 align-middle">
        <tbody>
          {products.orderProducts.map(({ productName, priceUAH, priceUSD, id }) => {
            return <tr key={id}>
              <td>{productName}</td>
              <td>
                {priceUSD > 0 && <div className="border-0 small text-gray-500">{priceUSD} USD</div>}
                {priceUAH > 0 && <div className="border-0">{priceUAH} UAH</div>}
              </td>
              <td className="text-center">
                <button type="button" onClick={() => handleDelete(id, priceUAH, priceUSD)} className="border-0">
                  <BiTrash size={24} />
                </button>
              </td>
            </tr>;
          })}
       </tbody>
    </table></div>
  </div>;
}