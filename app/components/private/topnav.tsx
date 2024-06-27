import React from "react";
import ThemeSwitcher from "@/app/components/navbar/themeswitcher";
import Avatar from "@/app/components/navbar/avatar";

function Topnav () {
  return (
    <nav className="navbar justify-around bg-base-200 text-base-content">
      <div className="navbar-start p-4">
        <Avatar />
      </div>
      <div className="navbar-center p-4">
        <a href="/" className="btn dark:hover:btn-primary hover:btn-secondary btn-outline text-xl">
          ACBUD's
        </a>
      </div>
      <div className="navbar-end p-4">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Topnav;
