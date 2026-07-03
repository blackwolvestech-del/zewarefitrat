import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getOrders } from "@/lib/db";

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getOrders());
}
