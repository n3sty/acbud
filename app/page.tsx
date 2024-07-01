import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";
import { createClient } from "./utils/supabase/server";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen bg-base-200 flex-col items-center justify-between p-24">
        <Login />
      </main>
    </>
  );
}
