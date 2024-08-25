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
    const suggestions = [...Array(20)].map((_, i) => ({
      name: faker.internet.displayName(),
      avatar: faker.image.avatarLegacy(),
      bio: faker.lorem.sentence(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <>
      <div className="flex border-gray-300 border-[2px] space-x-2 p-4 bg-white mt-6 rounded-xl overflow-x-scroll scrollbar-hide">
        {session && (
          <Story
            img={session?.user?.image as string}
            name={session?.user?.name as string}
          />
        )}

        {suggestions.map((profile) => (
          <Story
            key={profile.id}
            img={profile.avatar}
            name={profile.name}
          />
        ))}
      </div>
    </>
  );
}

export default Stories;
