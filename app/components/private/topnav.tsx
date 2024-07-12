import React from "react";
import Avatar from "@/app/components/private/avatar";

function Topnav() {
  return (
    <nav className="navbar md:justify-around justify-between bg-base-200 text-base-content">
      <div className="p-4">
        <a
          href="/home"
          className="btn dark:btn-primary dark:hover:btn-outline btn-secondary hover:btn-outline text-xl"
        >
          ACBUD's
        </a>
      </div>
      <div className=" p-4">
        <Avatar />
      </div>
    </nav>
  );
}

export default Topnav;
