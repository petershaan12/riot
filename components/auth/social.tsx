import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/lib/auth";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
        className="w-full"
      >
        <Button type="submit" size="lg" className="w-full bg-white rounded-lg">
          <FcGoogle className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};
