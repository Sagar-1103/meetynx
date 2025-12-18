import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get("jwtToken") ?? null;
  return NextResponse.json({ token: tokenFromCookie });
}
