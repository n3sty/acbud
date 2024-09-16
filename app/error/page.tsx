"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";

function Error() {
  const searchParams = useSearchParams();
  const errmsg = searchParams.get("msg");


  return (
    <div className="flex flex-col items-center justify-center space-y-8 h-screen">
      <h1 className="text-4xl font-bold">Error</h1>
      <p className="text-lg">{errmsg}</p>
      <Link href="/">Go to home</Link>
    </div>
  );
}

export default Error;
