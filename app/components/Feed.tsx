"use client"

import React, { useRef, useEffect } from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed() {
  const fixedContainerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <main className="grid text-base-content w-full grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      <section className="relative hidden xl:inline-grid md:col-span-1">
        <div ref={fixedContainerRef} className="fixed">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
}

export default Feed;
