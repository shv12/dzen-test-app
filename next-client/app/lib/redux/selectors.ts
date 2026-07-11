import { RootState } from "../store";

export const ordersSelector = (state: RootState) => state.orders;
export const productsSelector = (state: RootState) => state.products;
export const productTypesSelector = (state: RootState) => state.productTypes;
export const localeSelector = (state: RootState) => state.locale;