import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <p>Profile</p>
          <p>{session?.user?.email}</p>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
