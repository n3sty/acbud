"use client";

import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
// import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";
import ProfileWarning from "./ProfileWarning";

function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={`grid text-base-content w-full 
      grid-cols-1 md:grid-cols-2 md:max-w-3xl 
      xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        {session && !session.user.username && <ProfileWarning />}
        {/* <Stories /> */}
        <Posts />
      </section>

      {session && (
        <>
          <section className="relative max-w-sm hidden xl:inline-grid md:col-span-1">
            <div className="fixed max-w-sm">
              <MiniProfile />
              <Suggestions />
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Feed;
