"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setLocale } from "@/app/lib/redux/localeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { localeSelector } from "@/app/lib/redux/selectors";
import { Locale } from "@/app/types/definitions";

const options = [
  ['en', 'En'],
  ['ru', 'Ru'],
];

export default function LocaleSelect() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { locale } = useAppSelector(localeSelector);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    if (!pathname) return;

    const locale = e.target.value as Locale;
    const chunks = pathname.split("/");
    chunks[1] = locale;
    const strParams = params.toString();
    const newPath = chunks.join("/");

    const newPathWithParams = strParams === "" ? newPath : `${newPath}?${params.toString()}`;

    dispatch(setLocale(locale));
    console.log("LocaleSelect :: handleLocaleChange :: chunks", chunks);
    // router.push(chunks.join("/"));
    window.history.pushState({}, "", newPathWithParams);
    router.refresh();
  }

  useEffect(() => {
    const chunks = pathname.split("/");
    dispatch(setLocale(chunks[1] as Locale));
  }, [dispatch, pathname]);

  return <select className="form-select ms-2 py-0 w-auto border shadow-none" onChange={handleLocaleChange} value={ locale}>
    {options.map(([value, label]) => <option key={value} value={value}>{ label}</option>)}
  </select>;
}