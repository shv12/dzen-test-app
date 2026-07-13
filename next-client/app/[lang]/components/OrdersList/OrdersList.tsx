"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { ordersSelector } from "@/app/lib/redux/selectors";
import { Order, OrderRowMode } from "@/app/types/definitions";
import OrderRow from "@/app/[lang]/components/OrderRow/OrderRow";
import { OrderDeleteConfirm } from "@/app/[lang]/components/OrderDeleteConfirm";
import { api } from "@/app/lib/api";
import axios from "axios";
import { useAppDispatch } from "@/app/lib/hooks";
import { deleteOrderAction, showOrderProducts, hideOrderProducts } from "@/app/lib/redux/ordersSlice";
import { OrderProducts } from "../OrderProducts";
import styles from "./OrdersList.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function OrdersList() {
  const { orders } = useAppSelector(ordersSelector);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [orderToShow, setOrderToShow] = useState<Order | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentOrderID = searchParams.get("orderID");
  const mode = currentOrderID === null ? "long" : "short";
  const { replace } = useRouter();

  const deleteOrder = async (id: number) => {
    setDeleteConfirmIsOpen(false);
    setOrderToDelete(null);
    try {
      const response = await api.post("/api/orders/delete", { orderID: id });
      const { success} = response.data;
      if (success) {
        dispatch(deleteOrderAction(id));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create order");
      } else {
        setError("An unexpected error occured");
      }
    }
  }

  const handleDelete = (order: Order) => {
    setOrderToDelete(order);
    setDeleteConfirmIsOpen(true);
  }

  const handleOrderClick = (order: Order, index: number) => {
    console.log('handleOrderClick :: order', order);
    setOrderToShow(order);

    if (mode === "short" && currentOrderID === order.id.toString()) {
      dispatch(hideOrderProducts());
      params.delete("orderID");
    } else {
      dispatch(showOrderProducts({ order, orderIndex: index }));
      params.set("orderID", order.id.toString());
    }
    const strParams = params.toString();
    replace(strParams === "" ? pathname : `${pathname}?${strParams}`);
  }

  const handleProductsClose = () => {
    setOrderToShow(null);
    dispatch(hideOrderProducts());
    dispatch(hideOrderProducts());
    params.delete("orderID");
    const strParams = params.toString();
    replace(strParams === "" ? pathname : `${pathname}?${strParams}`);
  }



  return <div className="d-flex">
    <div className={`${styles["smooth-table-container"]} ${mode === "long" ? styles["orders-table-expanded"] : styles["orders-table-collapsed"]}`}>
      <table className={`table ${mode === "short" ? "w-auto": ""} align-middle table-hover table-gapped text-gray-500 orders-table`}><tbody>
          {orders.map((order, i) => {
            return <OrderRow
              key={ order.id}
              order={order}
              mode={mode}
              onDelete={() => handleDelete(order)}
              onOrderClick={() => handleOrderClick(order, i)}
              isCurrent={ currentOrderID === order.id.toString()}
            />;
          } )}
      </tbody>
      </table>
    </div>
    <OrderDeleteConfirm
      isOpen={deleteConfirmIsOpen}
      orderName={orderToDelete?.orderName}
      onClose={() => {
        setDeleteConfirmIsOpen(false);
        setOrderToDelete(null);
      }}
      onDelete={() => deleteOrder(orderToDelete!.id)}
    />
    {mode === "short" && <OrderProducts
      order={orderToShow}
      onClose={ handleProductsClose}
    />}
  </div>;
}