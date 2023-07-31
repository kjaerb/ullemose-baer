import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authentication, getUser } from "@/lib/firebase";

export async function middleware(request: NextRequest) {}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
