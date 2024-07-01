import React from "react";
import { createClient } from "@/app/utils/supabase/server";

function HomePage() {
  return (
    <main className="flex min-h-screen bg-base-200 flex-col items-center justify-between p-24">
      <Home/>
    </main>
  );
}

async function Home() {
  const isLoggedIn = await checkIfUserIsLoggedIn();
  return (
    <div>
      <h1>Home ({isLoggedIn}) </h1>
    </div>
  );
}

async function checkIfUserIsLoggedIn() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user) {
    return 1;
  } else {
    return 0;
  }
}

export default HomePage;
  