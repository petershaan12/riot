import { CardWrapper } from "@/components/auth/card-wrapper";
import { UsernameForm } from "@/components/auth/username-form";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

const UsernamePage = async () => {
  const session = await auth();
  if (session?.user.username) redirect("/profile");

  return (
    <>
      <CardWrapper>
        <UsernameForm userId={session?.user.id} />
      </CardWrapper>
    </>
  );
};

export default UsernamePage;
