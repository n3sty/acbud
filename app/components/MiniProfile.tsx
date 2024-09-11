import Image from "next/image";
import React from "react";
import { createClient } from "../utils/supabase/server";

async function MiniProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <Image
        className="rounded-full border p-[2px]"
        src={user?.user_metadata.picture}
        alt=""
        width={60}
        height={60}
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{user?.user_metadata.name}</h2>

        <h3 className="text-sm text-gray-400">Welcome to ACBUDS</h3>
      </div>

      <button className="text-blue-400 text-sm font-semibold">Sign Out</button>
    </div>
  );
}

export default MiniProfile;
