"use client";

import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { Suggestion } from "../../types/types";
import { useSession } from "next-auth/react";

function Stories() {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    // Fetch stories from the backend
    const suggestions = [...Array(11)].map((_, i) => ({
      username: faker.internet.userName(),
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
        {session && (
          <Story
            img={session?.user?.image as string}
            username={session?.user?.username as string}
          />
        )}

        {suggestions.slice(0, showAll ? suggestions.length : maxRows).map((profile) => (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.username}
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
