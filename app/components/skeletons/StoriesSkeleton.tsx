import React from "react";

function StoriesSkeleton() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-2 mt-6 p-4 rounded-xl">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="skeleton h-14 w-14 md:h-16 md:w-16 rounded-full"
        ></div>
      ))}
    </div>
  );
}

export default StoriesSkeleton;
