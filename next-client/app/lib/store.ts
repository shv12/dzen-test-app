import { configureStore } from "@reduxjs/toolkit";
import { ordersSlice } from "./redux/ordersSlice";
import { productTypesSlice } from "./redux/productTypesSlice";
import { productsSlice } from "./redux/productsSlice";
import { localeSlice } from "./redux/localeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      orders: ordersSlice.reducer,
      productTypes: productTypesSlice.reducer,
      products: productsSlice.reducer,
      locale: localeSlice.reducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];