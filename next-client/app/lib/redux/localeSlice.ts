import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { NestedDict } from "@/app/types/definitions";

interface LocaleState {
  locale: 'en' | 'ru';
  dict: NestedDict;
}

const initialLocaleState: LocaleState = {
  locale: 'en',
  dict: {},
}

export const localeSlice = createSlice({
  name: "locale",
  initialState: initialLocaleState,
  reducers: {
    setDict: (state, action: PayloadAction<NestedDict>) => {
      state.dict = action.payload;
    },
    setLocale(state, action: PayloadAction<'en' | 'ru'>) {
      state.locale = action.payload;
    }
  }
});

export const {
  setDict,
  setLocale,
} = localeSlice.actions;