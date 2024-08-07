import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterForm } from "@/components/auth/register-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Resgiter = async () => {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <>
      <CardWrapper showSocial>
        <RegisterForm />
      </CardWrapper>
      <p className="text-xs py-6">
        Already have an account?{" "}
        <a className="font-bold hover:underline " href="/auth/login">
          Login 
        </a>
      </p>
    </>
  );
};

export default Resgiter;
