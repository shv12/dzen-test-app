"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppPage } from "@/app/[lang]/components/AppPage";
import { AddProductForm } from "@/app/[lang]/components/AddProductForm";
import { useAppSelector, useTranslations } from "@/app/lib/hooks";
import { ordersSelector, localeSelector } from "@/app/lib/redux/selectors";

export default function AddProduct() {
  const { currentOrder } = useAppSelector(ordersSelector);
  const router = useRouter();
  const { locale, dict } = useAppSelector(localeSelector);
  const t = useTranslations(dict);

  useEffect(() => {
    if (!currentOrder) {
      router.push(`/${locale}/orders`);
    }
  }, [currentOrder, locale, router]);

  return <AppPage
    title={<div className="text-2xl fw-bold">{t('addProductTo')} <em>{ currentOrder?.orderName}</em></div> }
  >
    <AddProductForm />
  </AppPage>
}