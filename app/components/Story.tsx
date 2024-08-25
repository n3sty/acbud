/* eslint-disable @next/next/no-img-element */
import React from "react";

function Story({ img, name }: { img: string; name: string }) {
  return (
    <div className="text-base-content w-20">
      <img className="h-20 w-20 drag-none select-none rounded-full p-[1.5px] border-[3px] border-primary object-contain cursor-pointer hover:scale-110 transition-all transform duration-200 ease-out" src={img} alt="" />
      <p className="text-xs w-20 truncate select-none text-center">
        {/* {name} */}
      </p>
    </div>
  );
}

export default Story;
