'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useAppSelector, useTranslations } from "@/app/lib/hooks";
import { productsSelector, productTypesSelector, localeSelector } from "@/app/lib/redux/selectors";

export default function ProductsTitle() {
  const { productsCount } = useAppSelector(productsSelector);
  const { productTypes } = useAppSelector(productTypesSelector);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { dict } = useAppSelector(localeSelector);
  const t = useTranslations(dict);

  let productType = searchParams.get("productType");
  if (!productType) {
    productType = '0';
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const productType = e.target.value;
    // console.log("ProductsTitle :: e.target.value", e.target.value);
    const params = new URLSearchParams(searchParams);
    if (productType !== "0") {
      params.set("productType", productType);
    } else {
      params.delete("productType");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return <div className="d-flex align-items-center">
    <div className="me-4 text-2xl fw-bold">
      {t('products')} / {productsCount}
    </div>
    <div className="me-2 small text-gray-500">
      {t('productType')}:
    </div>
    <select name="productType" onChange={handleChange} className="form-control form-select shadow-none border w-50" value={productType}>
      <option key={0} value={0}>{ t('selectType')}</option>
      {productTypes.map(({ id, productType }) => (
        <option key={id} value={id}>{ productType}</option>
      ))}
    </select>
  </div>;
}