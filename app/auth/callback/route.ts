import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestURL = new URL(request.url);
    const code = requestURL.searchParams.get("code");
    const origin = requestURL.origin;

    if (code) {
        const supabase = createClient();
        
    }
}