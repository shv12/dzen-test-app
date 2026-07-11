import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/types/definitions";

interface ProductsState {
  products: Product[];
  productsCount: number;
  orderProducts: Product[];
  error: string | null;
  isLoading: boolean;
}

const initialProductsState: ProductsState = {
  products: [],
  productsCount: 0,
  orderProducts: [],
  error: null,
  isLoading: false
}

export const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
      addProductAction(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    deleteOrderProduct(state, action: PayloadAction<number>) {
      // console.log("productsSlice :: deleteOrderProduct :: action.payload", action.payload);
      state.orderProducts = state.orderProducts.filter((product) => product.id !== action.payload);
      state.products = state.products.filter((product) => product.id !== action.payload);
      console.log("productsSlice :: deleteOrderProduct :: state.products", state.products);
      state.productsCount = state.productsCount - 1;
    },
    setOrderProducts(state, action: PayloadAction<Product[]>) {
      state.orderProducts = action.payload;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setProductsCount(state, action: PayloadAction<number>) {
      state.productsCount = action.payload;
    }
  }
});

export const {
  addProductAction,
  deleteOrderProduct,
  setOrderProducts,
  setProducts,
  setProductsCount,
} = productsSlice.actions;