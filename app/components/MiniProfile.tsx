/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <Image
        className="rounded-full border p-[2px]"
        src={session?.user?.image as string}
        alt=""
        width={60}
        height={60}
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">
          {
            session?.user?.username ? session.user.username : session?.user?.name
          }
        </h2>
        <h3 className="text-sm text-gray-400">Welcome to ACBUDS</h3>
      </div>

      <button
        onClick={() => signOut()}
        className="text-blue-400 text-sm font-semibold"
      >
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
