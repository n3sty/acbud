import Navbar from "./components/public/_navbar";
import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import { SubmitButton } from "./components/submit-button";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(
        "/?message=Could not authenticate user. Please try again."
      );
    }

    return redirect("/feed");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect(`/?message=${error.message}`);
    }

    return redirect("/?message=Check your email for a verification link.");
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen bg-base-200 flex-col items-center justify-between p-24">
        <div className="w-96 dark:bg-base-100 bg-base-200 rounded-xl shadow-lg dark:shadow-primary/10 shadow-secondary/10 p-8">
          {/* FORM TITLE */}
          <h2 className="text-4xl dark:text-primary text-secondary font-bold mb-8">
            Login, <br /> join the gang.
          </h2>

          {/* EMAIL INPUT */}
          <form className="form-control space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="email"
                autoComplete="email"
                name="email"
                className="input input-bordered grow placeholder:text-base-content/50 invalid:input-error invalid:text-error invalid:focus:input-error invalid:focus:text-error"
                placeholder="Email"
              />
            </label>

            {/* PASSWORD INPUT */}
            <label className="flex items-center gap-2">
              <input
                type="password"
                autoComplete="current-password"
                name="password"
                className="input input-bordered grow placeholder:text-base-content/50"
                placeholder="Password"
              />
            </label>

            {/* BUTTONS */}
            <div className="flex flex-row space-x-4 justify-center">
              <SubmitButton
                formAction={signIn}
                pendingText="Signing in..."
                className="btn dark:btn-primary btn-secondary transition-all w-32 hover:shadow-md hover:font-black"
              >
                Log In
              </SubmitButton>
              <SubmitButton
                formAction={signUp}
                pendingText="Signing up..."
                className="btn dark:btn-primary btn-secondary btn-outline transition-all w-32 hover:shadow-md hover:font-black"
              >
                Sign Up
              </SubmitButton>
            </div>
            {searchParams.message && (
              <p className="text-error text-center mt-4">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
