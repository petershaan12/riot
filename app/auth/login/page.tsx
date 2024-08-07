import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <>
      <CardWrapper showSocial>
        <LoginForm />
      </CardWrapper>
      <p className="text-xs py-6">
        Don’t have an account yet?{" "}
        <a className="font-bold hover:underline " href="/auth/register">
          Register for free
        </a>
      </p>
    </>
  );
};

export default LoginPage;
