import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <article className="flex items-center gap-2 ">
      <Image src="/logo.png" width={40} height={40} alt="Quick Meet Logo" />
      <h2 className=" text-lg">
        Quick <span className="text-blue-600 font-bold">Meet</span>
      </h2>
    </article>
  );
}

export default Logo;
