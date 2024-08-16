import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

const TidakDitemukan = () => {
  return (
    <section className="bg-contain md:py-10 flex justify-center ">
      <div className="md:w-[800px] my-5 flex justify-center items-center flex-col">
        <Image
          src="/assets/images/404.png"
          objectFit="cover"
          width={300}
          height={300}
          quality={100}
          priority
          alt="No Found"
        />
        <p className="text-lg md:text-2xl font-medium">Not Found</p>
        <p className="mt-2 text-[#848484] text-xs md:text-base">
          Looks like you discovered a page that doesn't exist or you don't have
          access to.
        </p>
        <Link className="mt-12 flex items-center hover:underline " href="/">
          <FaHome className="mr-2" /> Home
        </Link>
      </div>
    </section>
  );
};

export default TidakDitemukan;
