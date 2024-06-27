"use client";

import { passwordLogin, passwordSignUp } from "./actions";

function Login() {
  return (
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
          <button
            type="submit"
            formAction={passwordLogin}
            className="btn dark:btn-primary btn-secondary transition-all w-32 hover:shadow-md hover:font-black"
          >
            Log In
          </button>
          <button
            type="submit"
            formAction={passwordSignUp}
            className="btn dark:btn-primary btn-secondary btn-outline transition-all w-32 hover:shadow-md hover:font-black"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
