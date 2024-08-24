import React from "react";

function HeaderSkeleton() {
  return (
    <div className="grid w-full grid-cols-1z-10 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      <div className="text-base-content skeleton h-16 col-span-3 py-1 px-3 md:-mx-1 md:rounded-xl md:mt-4 md:border md:top-6">
        <div className="flex justify-between items-center mx-4 py-2 md:py-0 max-w-6xl"></div>
      </div>
    </div>
  );
}

export default HeaderSkeleton;
