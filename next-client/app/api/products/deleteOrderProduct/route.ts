import { NextResponse } from "next/server";
import {
    deleteOrderProduct
 } from "@/app/lib/actions";
import { createConnection } from "@/app/[lang]/seed/route";

export const POST = async (request: Request) => {
  const connection = await createConnection();
  let result = null;
    const { productID} = await request.json();
    console.log("api/products/deleteOrderProduct :: POST :: productID", productID);
  try {
    result = await deleteOrderProduct({ connection, productID });
  } finally {
    await connection.end();
  }

  return NextResponse.json({ success: true, result }, { status: 200 });
};
