"use client";

import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./feed/Story";
import { Suggestion } from "../../types/types";

function Stories() {
  const session = true
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    // Fetch stories from the backend
    const suggestions = [...Array(20)].map((_, i) => ({
      name: faker.internet.displayName(),

      avatar: faker.image.avatarLegacy(),
      bio: faker.lorem.sentence(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  const [showAll, setShowAll] = useState(false);
  const maxRows = 3;

  return (
    <>
      <div className="grid grid-cols-4 scrollbar-hide md:grid-cols-4 gap-2 border-gray-300 border-[2px] p-4 bg-white mt-6 rounded-xl transition-transform">
        {/* {session && (
          <Story
            img={session?.user?.image as string}
            name={session?.user?.name as string}
          />
        )} */}

        {suggestions.slice(0, showAll ? suggestions.length : maxRows).map((profile) => (
          <Story
            key={profile.id}
            img={profile.avatar}
            name={profile.name}
          />
        ))}
      </div>

      {!showAll && suggestions.length > maxRows && (
        <button
          className="text-blue-500 mt-2 mx-4"
          onClick={() => setShowAll(true)}
        >
          Show more
        </button>
      ) || (
        <button
          className="text-blue-500 mt-2 mx-4"
          onClick={() => setShowAll(false)}
        >
          Show less
        </button>
      )}
    </>
  );
}

export default Stories;
