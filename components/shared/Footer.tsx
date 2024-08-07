import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" flex-center wrapper flex-between flex flex-col gap-4  text-center sm:flex-row">
      <div>
        <div className="py-2">
          <Link href="/" className="opacity-50">
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

      <p className="text-xs font-light">2024 Riot, All Right reserved.</p>
    </footer>
  );
};

export default Footer;
