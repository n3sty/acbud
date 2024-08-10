/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { Suspense } from "react";

function Story({ img, username }: { img: string; username: string }) {
  return (
    <Suspense fallback={<p>Loading Story...</p>}>
      <div className="text-base-content">
        <div className="md:min-h-64 group w-full">
          <Image
            src={img}
            alt={username}
            width={200}
            height={500}
            className="border md:min-h-64 group-hover:border-4 group-hover:border-primary transition-all border-gray-300 object-cover rounded-3xl"
          />
        </div>
      </div>
    </Suspense>
  );
}

export default Story;
