import { NextResponse } from "next/server";
import { deleteOrder } from "@/app/lib/actions";
import { createConnection } from "@/app/[lang]/seed/route";

export const POST = async (request: Request) => {
  const connection = await createConnection();
  let result = null;
  const { orderID } = await request.json();
  try {
    result = await deleteOrder({ connection, orderID });
  } finally {
    await connection.end();
  }

  return NextResponse.json({ success: true, result }, { status: 200 });
};
