import React from "react";
import StoriesSkeleton from "./StoriesSkeleton";
import PostsSkeleton from "./PostsSkeleton";

function FeedSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      <div className="col-span-2">
        <StoriesSkeleton />
        <PostsSkeleton />
      </div>
    </div>
  );
}

export default FeedSkeleton;
