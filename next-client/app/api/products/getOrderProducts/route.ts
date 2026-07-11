import { NextResponse } from "next/server";
import {getOrderProducts } from "@/app/lib/actions";
import { createConnection } from "@/app/[lang]/seed/route";

export const POST = async (request: Request) => {
  const connection = await createConnection();
  let result = null;
    const { orderID} = await request.json();
    console.log("api/products/getOrderProducts :: POST :: orderID", orderID);
  try {
    result = await getOrderProducts({ connection, orderID });
  } finally {
    await connection.end();
  }

  return NextResponse.json({ success: true, result }, { status: 200 });
};
