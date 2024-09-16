"use server";
import { createClient } from "@/app/utils/supabase/server";
import { checkIdAvailability } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    var session = await supabase.auth.exchangeCodeForSession(code);

    const user = session.data.user;

    if (user && !(await checkIdAvailability(user.id))) {
      // When true, ID is available, so create new user
      return NextResponse.redirect(`${origin}/auth/onboarding`);
    } else {
      return NextResponse.redirect(`${origin}/error?msg=onboarding failed`)
    }
  }

  return NextResponse.redirect(`${origin}/`);
}
