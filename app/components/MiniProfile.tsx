/* eslint-disable @next/next/no-img-element */
import React from "react";

function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="w-16 h-16 rounded-full border p-[2px]"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        alt=""
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">Jobsie123</h2>
        <h3 className="text-sm text-gray-400">Welcome to ACBUDS</h3>
      </div>

      <button className="text-blue-400 text-sm font-semibold">Sign Out</button>

    </div>
  );
}

export default MiniProfile;
