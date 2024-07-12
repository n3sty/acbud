import{ checkIfUserIsLoggedIn }from "@/app/components/private/scripts";
import { redirect } from "next/navigation";

export default async function ExplorePage() {
  const isLoggedIn = await checkIfUserIsLoggedIn();

  if (isLoggedIn) {
  return (
    <main className="flex min-h-screen bg-base-200 flex-col items-center justify-between p-24">
      Explore Page
    </main>
  );} else {
    redirect("/login");
  }
}
