/* eslint-disable @next/next/no-img-element */
import React from "react";

function SuggestionCard({ img, username, bio }: { img: string; username: string; bio: string }) {
  return (
    <div className="flex items-center justify-between mt-3">
      <img
        className="h-10 w-10 rounded-full p-[2px] border"
        src={img}
        alt=""
      />
      <div className="flex-1 ml-4">
        <h2 className="text-sm font-bold">{username}</h2>
        <h3 className="text-xs text-gray-400">{bio}</h3>
      </div>

      <button className="text-blue-400 text-xs font-semibold">Follow</button>
    </div>
  );
}

export default SuggestionCard;
