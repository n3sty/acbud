"use client";
import Image from "next/image";
import React, { useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { useSession } from "@/lib/supabase/SessionProvider";
import { signOut } from "@/lib/supabase/handleSignOut";

function MiniProfile() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const user = session?.user ?? null;

  return (
    user && (
      <div className="flex items-center justify-between mt-14 ml-10 w-full">
        <Image
          className="rounded-full border p-[2px]"
          src={user?.user_metadata.avatar_url}
          alt=""
          width={60}
          height={60}
        />

        <div className="flex-1 mx-4">
          <h2 className="font-bold">{user?.user_metadata.name}</h2>
          <h3 className="text-sm text-gray-400">Welcome to ACBUDS</h3>
        </div>
        {!loading ? (
          <button
            className="text-blue-400 text-sm font-semibold"
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Sign Out
          </button>
        ) : (
          <span className="loading loading-spinner loading-sm text-blue-400 justify-end align-middle"></span>
        )}
      </div>
    )
  );
}

export default MiniProfile;
