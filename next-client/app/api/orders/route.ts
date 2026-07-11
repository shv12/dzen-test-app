import { NextResponse } from "next/server";
import { getOrders, getProductTypes, getProductsCount } from "@/app/lib/actions";
import { createConnection } from "@/app/[lang]/seed/route";

export const GET = async () => {
  const connection = await createConnection();
  let orders = null;
  let productTypes = null;
  let productsCount = null;
  try {
    orders = await getOrders({ connection });
    productTypes = await getProductTypes({ connection });
    productsCount = await getProductsCount({connection});
  } finally {
    await connection.end();
  }

  return NextResponse.json({ orders, productTypes, productsCount }, { status: 200 });
};
