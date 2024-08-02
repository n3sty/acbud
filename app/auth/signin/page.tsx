"use client";
import React from "react";
import { signIn as signInWithProvider } from "next-auth/react";
import Header from "@/app/components/Header";
import Image from "next/image";

function SignIn() {
  return (
    <div className="bg-base-200 text-base-content">
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen -mt-56 px-14 text-center py-2">
        <Image width={300} height={200} src="https://links.papareact.com/ocw" alt="" />
        <div className="flex flex-col w-full max-w-xs mt-40">
          <button
            className="p-3 bg-blue-500 text-white rounded-lg"
            onClick={() => signInWithProvider("google", { callbackUrl: "/" })}
          >
            Sign in with Google
          </button>
          <button
            className="p-3 bg-gray-800 text-white rounded-lg mt-4"
            onClick={() => signInWithProvider("github", { callbackUrl: "/" })}
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
