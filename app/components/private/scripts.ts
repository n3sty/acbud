"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

async function checkIfUserIsLoggedIn() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user) {
    return 1;
  } else {
    return 0;
  }
}

async function signOut() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    return redirect(`/?message=Logged out successfully.`);
  };


export { signOut, checkIfUserIsLoggedIn };