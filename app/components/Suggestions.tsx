/* eslint-disable @next/next/no-img-element */
"use client";
import { faker } from "@faker-js/faker";
import React, { useEffect } from "react";
import { Suggestion } from "./types";
import SuggestionCard from "./SuggestionCard";

function Suggestions() {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      username: faker.internet.userName(),
      avatar: faker.image.avatarLegacy(),
      bio: faker.lorem.sentence(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>

      {suggestions.map((profile) => (
        <SuggestionCard key={profile.id} img={profile.avatar} username={profile.username} bio={profile.bio}></SuggestionCard>
      ))}
    </div>
  );
}

export default Suggestions;
