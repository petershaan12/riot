import Header from "@/components/shared/Header";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Page Not Found · Riot",
  description: "Not Found Riot",
};

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col ">
      <div className="css-gradient bg-custom-gradient"></div>
      <Header />
      <section className="bg-contain md:py-10 flex justify-center ">
        <div className="flex flex-col items-center justify-center text-center">
          <Image src="/animation/404.gif" width={100} height={20} />
          <h1 className="text-[130px] text-white font-monument-regular ">
            404
          </h1>
          <p className=" w-[300px] text-center">
            Looks like you discovered a page that doesn't exist or you don't
            have access to.
          </p>
          <Link className="mt-12 flex items-center hover:underline " href="/">
            <FaHome className="mr-2" /> Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
