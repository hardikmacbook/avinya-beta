import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <Image
          className="w-[120px] sm:w-[100px] lg:w-[150px] h-[40px] sm:h-[50px] lg:h-[70px] object-contain transition-all duration-300"
          src={"/assets/images/logo.png"}
          alt="avinya logo"
          width="180"
          height="80"
          priority
        />
      </Link>
    </>
  );
};

export default Logo;
