import ThemeSwitcher from "@/app/components/public/themeswitcher";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../submit-button";

export default async function Avatar() {
  const signOut = async () => {
    "use server";
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error", error);
      return;
    }

    redirect("/");
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar placeholder"
      >
        <div className="text-neutral-content w-12 bg-neutral rounded-full">
          <span className="text-3xl">D</span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li className="grow mx-auto">
          <ThemeSwitcher showIcons={true} />
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <SubmitButton onClick={signOut} pendingText="Signing out...">
            Sign out
          </SubmitButton>
        </li>
      </ul>
    </div>
  );
}
