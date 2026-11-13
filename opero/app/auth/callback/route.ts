import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const dashboardUrl = new URL("/dashboard", requestUrl.origin);
  const registerErrorUrl = new URL("/register", requestUrl.origin);
  registerErrorUrl.searchParams.set("error", "google");

  if (!code) {
    return NextResponse.redirect(registerErrorUrl);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("auth callback error:", error);
      return NextResponse.redirect(registerErrorUrl);
    }

    return NextResponse.redirect(dashboardUrl);
  } catch (error) {
    console.error("auth callback error:", error);
    return NextResponse.redirect(registerErrorUrl);
  }
}
