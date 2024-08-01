import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div>
      <h1>I am a header</h1>

      {/* Left */}
      <div>
        <Image
          src="https://links.papareact.com/ocw"
          alt="acbuds logo"
          fill={true}
        />
      </div>

      {/* Middle */}

      {/* Right */}
    </div>
  );
}

export default Header;
