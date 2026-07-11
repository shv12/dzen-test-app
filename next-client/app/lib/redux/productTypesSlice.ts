import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/app/types/definitions";

interface ProductTypesState {
  productTypes: ProductType[];
}

const initialTypesState: ProductTypesState = {
  productTypes: [],
}

export const productTypesSlice = createSlice({
  name: "productTypes",
  initialState: initialTypesState,
  reducers: {
    addProductTypeAction(state, action: PayloadAction<ProductType>) {
      state.productTypes.push(action.payload);
    },
    setProductTypes(state, action: PayloadAction<ProductType[]>) {
      state.productTypes = action.payload;
    }
  }
});

export const {
  addProductTypeAction,
  setProductTypes,
} = productTypesSlice.actions;