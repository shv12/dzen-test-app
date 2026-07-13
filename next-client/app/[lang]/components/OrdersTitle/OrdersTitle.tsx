'use client';

import { BsPlusCircleFill } from "react-icons/bs";
import { ordersSelector } from "@/app/lib/redux/selectors";
import AppLink from "../AppLink/AppLink";
import { useAppSelector, useTranslations } from "@/app/lib/hooks";
import { localeSelector } from "@/app/lib/redux/selectors";

export default function OrdersTitle() {
    const { orders } = useAppSelector(ordersSelector);
    const { dict } = useAppSelector(localeSelector);
    const t = useTranslations(dict);
    return <div className="text-2xl fw-bold">
        <AppLink
            href="/orders/add"
            className="mr-2"
        ><BsPlusCircleFill size={ 24 } className="text-green-700 d-inline" /></AppLink>{t('orders')} / {orders.length}</div>;
}