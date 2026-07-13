import { NextResponse } from "next/server";
import { addProduct } from "@/app/lib/actions";
import { createConnection } from "@/app/[lang]/seed/route";

export const POST = async (request: Request) => {
  const connection = await createConnection();
  let result = null;
    const { payload} = await request.json();
    // console.log("api/products/add :: POST :: payload", payload);
  try {
    result = await addProduct({ connection, payload });
  } finally {
    await connection.end();
  }

  return NextResponse.json({ success: true, result }, { status: 200 });
};
