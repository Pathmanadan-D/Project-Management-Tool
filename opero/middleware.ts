import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  // Auth logic added in Priority 10
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
