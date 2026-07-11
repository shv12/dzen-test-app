"use client";

import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";
import type { NestedDict } from "../types/definitions";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useTranslations = (dict: NestedDict) => {
    return (key: string): string => {
      let s = key.split(".").reduce<NestedDict | string | undefined>((acc, el) => {
        if (acc && typeof acc === "object" && el in acc) {
          return acc[el];
        }
        return undefined;
      }, dict);

        if (typeof s !== 'string') {
            s = key;
        }
        return s;
    }
}