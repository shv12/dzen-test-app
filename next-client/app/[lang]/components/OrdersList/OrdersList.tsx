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

export default function OrdersList() {
  const { orders, mode, currentOrderIndex } = useAppSelector(ordersSelector);
  // const [mode, setMode] = useState<OrderRowMode>("long");
  // const [currentOrder, setCurrentOrder] = useState<number | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [orderToShow, setOrderToShow] = useState<Order | null>(null);

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
    // setCurrentOrder(index);
    setOrderToShow(order);
    // setMode("short");

    if (mode === "short" && currentOrderIndex === index) {
      dispatch(hideOrderProducts());
    } else {
      dispatch(showOrderProducts({ order, orderIndex: index }));
    }
  }

  const handleProductsClose = () => {
    // setCurrentOrder(null);
    setOrderToShow(null);
    // setMode("long");

    dispatch(hideOrderProducts());
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
              isCurrent={ currentOrderIndex === i}
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