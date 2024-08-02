"use client";

import React, { useRef, useEffect } from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const fixedContainerRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (fixedContainerRef.current) {
        fixedContainerRef.current.style.width = `${fixedContainerRef.current.parentElement?.offsetWidth}px`;
        fixedContainerRef.current.style.top = `${fixedContainerRef.current.parentElement?.offsetTop}px`;
      }
    };

    handleResize(); // Set the initial width
    window.addEventListener("resize", handleResize); // Update width on window resize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [new window.Event("resize")]);

  return (
    <main
      className={`grid text-base-content w-full 
      grid-cols-1 md:grid-cols-2 md:max-w-3xl 
      xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {session && (
        <>
          <section className="relative max-w-sm hidden xl:inline-grid md:col-span-1">
            <div ref={fixedContainerRef} className="fixed">
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
