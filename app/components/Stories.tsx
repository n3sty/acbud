"use client";

import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import Glide from "@glidejs/glide";

type Suggestion = {
  username: string;
  avatar: string;
  bio: string;
  id: number;
};

function Stories() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    // Fetch stories from the backend
    const suggestions = [...Array(20)].map((_, i) => ({
      username: faker.internet.userName(),
      avatar: faker.image.avatarLegacy(),
      bio: faker.lorem.sentence(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-4 bg-white mt-6 border border-gray-300 rounded-md overflow-x-scroll scrollbar-hide">
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
