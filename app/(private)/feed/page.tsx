import { checkIfUserIsLoggedIn } from "@/app/components/private/scripts";
import { redirect } from "next/navigation";
import Feed from "./feed";

export default async function Page() {
  const isLoggedIn = await checkIfUserIsLoggedIn();

  if (!isLoggedIn) {
    return redirect("/login");
  } else {
    return <Feed />;
  }
}
