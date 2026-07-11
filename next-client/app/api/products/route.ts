import { NextResponse } from "next/server";
import { getProducts } from "@/app/lib/actions";
import { createConnection } from "@/app/[lang]/seed/route";

export const GET = async () => {
  const connection = await createConnection();
  let products = null;
  try {
    products = await getProducts({ connection });
  } finally {
    await connection.end();
  }

  return NextResponse.json({ products }, { status: 200 });
};
