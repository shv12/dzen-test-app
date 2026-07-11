export type FormFieldType = {
  name: string,
  label: string,
  placeholder: string,
  errorMessage?: string,
  isValid?: boolean,
  type?: string,
  list?: string
}

export type Locale = 'en' | 'ru';

export type NestedDict = {
  [key: string]: string | NestedDict;
};

export type Order = {
  id: number,
  orderName: string,
  createdAt: string,
  productsCount: number,
  amountUSD: number,
  amountUAH: number
}

export type OrderRowMode = "short" | "long";

export type ProductType = {
  id: number,
  productType: string
}

export type Product = {
  id: number,
  productName: string,
  productType: number | string,
  productTypeName?: string,
  guaranteeFrom: string,
  guaranteeUntil: string,
  priceUAH: number,
  priceUSD: number,
  orderID: number,
  orderName?: string
}