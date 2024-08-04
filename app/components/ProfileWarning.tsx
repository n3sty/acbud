import React from "react";
import Link from "next/link";

function ProfileWarning() {
  return (
    <>
      <Link href="/auth/onboarding">
        <div className="flex bg-primary bg-opacity-80 backdrop-blur-md sticky top-[100px] z-10 -mx-4 mt-6 rounded-xl transition-all hover:scale-[1.02]">
          <div className="group py-4 px-8 w-full">
            <h2 className="text-3xl text-white font-serif font-bold">
              Finalize your account
            </h2>
            <p className="text-primary-content/80">
              Complete your account setup with these steps {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="inline-block w-6 h-6 text-primary-content/80 transition-transform group-hover:translate-x-[20rem] duration-500 ease-linear group-hover:duration-[5000ms]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProfileWarning;
