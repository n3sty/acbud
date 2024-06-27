import React from "react";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";
import { createClient } from "./utils/supabase/server";

async function Home() {
  const isLoggedIn = await checkIfUserIsLoggedIn(); // Replace with your logic to check if user is logged in

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen bg-base-200 flex-col items-center justify-between p-24">
        {/* LOGIN FORM */}
        {isLoggedIn ? null : <Login />}
      </main>
    </>
  );
}

async function checkIfUserIsLoggedIn() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user.error) {
    return true;
  } else {
    return false;
  }
}

export default Home;
