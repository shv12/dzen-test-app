"use client";

import AppPage from "@/app/[lang]/components/AppPage/AppPage";
import AddOrderForm from "@/app/[lang]/components/AddOrderForm/AddOrderForm";
import { useAppSelector } from "@/app/lib/hooks";
import { localeSelector } from "@/app/lib/redux/selectors";

export default function AddOrderPage() {
    const { dict } = useAppSelector(localeSelector);
    return <AppPage title={<div className="text-2xl fw-bold">{dict.addOrder as string}</div>}><AddOrderForm /></AppPage>;
}