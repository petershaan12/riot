import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

const TidakDitemukan = () => {
  return (
    <section className="bg-contain md:py-10 flex justify-center ">
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/animation/404.gif"
          width={100}
          height={20}
          alt="not-found"
        />
        <h1 className="text-[130px] text-white font-monument-regular ">404</h1>
        <p className=" w-[300px] text-center">
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
