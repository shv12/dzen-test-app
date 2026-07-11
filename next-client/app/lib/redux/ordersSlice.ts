import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderRowMode } from "@/app/types/definitions";

interface OrdersState {
  orders: Order[],
  currentOrder: Order | null,
  currentOrderIndex: number | null,
  mode: OrderRowMode,
  isLoading: boolean,
  error: string | null
}

const initialOrdersState: OrdersState = {
  orders: [],
  currentOrder: null,
  currentOrderIndex: null,
  mode: "long",
  error: null,
  isLoading: false,
}

export const ordersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {
    addOrderAction(state, action: PayloadAction<Order>) {
      state.orders = [action.payload, ...state.orders];
    },
    addProductToAction(state, action: PayloadAction<{ orderID: number, priceUAH: number, priceUSD: number }>) {
      const { orderID, priceUAH, priceUSD } = action.payload;
      for (let i = 0; i < state.orders.length; i++) {
        const order = state.orders[i];
        if (order.id === orderID) {
          order.productsCount += 1;
          order.amountUAH += priceUAH;
          order.amountUSD += priceUSD;
          break;
        }
      }
    },
    deleteOrderAction(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter(
          (el) => el.id !== action.payload
        )
    },
    deleteProductFromOrder(state, action: PayloadAction<{ productID: number, orderID: number, priceUAH: number, priceUSD: number }>) {
      const { orderID, priceUAH, priceUSD } = action.payload;
      for (let i = 0; i < state.orders.length; i++) {
        const order = state.orders[i];
        if (order.id === orderID) {
          order.productsCount -= 1;
          order.amountUAH -= priceUAH;
          order.amountUSD -= priceUSD;
          break;
        }
      }
    },
    getOrdersInProgress(state) {
      state.isLoading = true;
    },
    getOrdersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload;
    },
    getOrdersError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    hideOrderProducts(state) {
      state.currentOrder = null;
      state.currentOrderIndex = null;
      state.mode = "long";
    },
    setInitialOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    showOrderProducts(state, action: PayloadAction<{ order: Order, orderIndex: number }>) {
      const { order, orderIndex } = action.payload;
      state.currentOrder = order;
      state.currentOrderIndex = orderIndex;
      state.mode = "short";
    }
  },
});

export const {
  addOrderAction,
  addProductToAction,
  deleteOrderAction,
  deleteProductFromOrder,
  getOrdersError,
  getOrdersInProgress,
  getOrdersSuccess,
  hideOrderProducts,
  setInitialOrders,
  showOrderProducts,
} = ordersSlice.actions;
