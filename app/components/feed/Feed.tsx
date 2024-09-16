"use client";
import React from "react";
import MiniProfile from "../MiniProfile";
import Posts from "../Posts";
import { useSession } from "@/lib/supabase/SessionProvider";

function Feed() {
  const session = useSession();
  const user = session?.user ?? null;
  return (
    <main
      className={`grid text-base-content w-full 
      grid-cols-1 md:grid-cols-2 md:max-w-3xl 
      xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        <Posts user={user} />
      </section>

      <section className="relative max-w-sm hidden xl:inline-grid md:col-span-1">
        <div className="fixed max-w-sm">
          <MiniProfile />
          {/* <Suggestions /> */}

          {/* Instead of suggestions, add some sort of "recent uploads" or "useful for you" section,
              where users can find certain actions performed by other users ("posts has been liked by ... people", 
              "try this function!" or "maybe you can find purpose in this way? (with link to article 
              regarding productivity on other websites??)") */}

          {/* NEW TO YOU: section for useful (new) info */}
          {/* <NewToYou /> */}
        </div>
      </section>
    </main>
  );
}

export default Feed;
