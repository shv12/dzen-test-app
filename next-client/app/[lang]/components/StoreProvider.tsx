"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/app/lib/store";
import { setDict } from "@/app/lib/redux/localeSlice";
import type { NestedDict } from "@/app/types/definitions";

export default function StoreProvider({
  children,
  dict
}: {
  children: React.ReactNode;
  dict: NestedDict;
}) {
  const [store] = useState<AppStore>(() => {
    const store = makeStore();
    store.dispatch(setDict(dict));
    return store;
  });

  return <Provider store={store}>{ children}</Provider>
}