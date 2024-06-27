import BottomNav from "@/app/components/private/bottomnav";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import Topnav from "@/app/components/private/topnav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
      <main className="flex-grow">
        <Topnav />
        {children}
        <BottomNav />
      </main>
    </div>
  );
}
