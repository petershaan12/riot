import Image from "next/image";
import Link from "next/link";
import {
  AiFillX,
  AiOutlineTwitter,
  AiOutlineTikTok,
  AiOutlineInstagram,
} from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" wrapper flex-between flex flex-col text-center sm:flex-row">
      <div>
        <div className=" md:block flex justify-center py-5 md:py-0">
          <Link href="/" className="opacity-50 ite">
            <Image
              src="/assets/images/logo.svg"
              width={100}
              height={20}
              alt="riot Logo"
            />
          </Link>
        </div>
        <div>
          <Link href="/terms" className="text-xs font-light pr-2 opacity-80">
            Terms
          </Link>
          <Link href="/privacy" className="text-xs font-light px-5  opacity-80">
            Privacy
          </Link>
          <Link
            href="/security "
            className="text-xs font-light px-2  opacity-80"
          >
            Security
          </Link>
        </div>
      </div>
      <div className="flex space-x-5 items-center py-5">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="w-5 h-5 opacity-50 hover:opacity-100" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitterX className="w-5 h-5 opacity-50 hover:opacity-100" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineInstagram className="w-6 h-6 opacity-50 hover:opacity-100" />
        </a>

        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineTikTok className="w-6 h-6 opacity-50 hover:opacity-100" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
