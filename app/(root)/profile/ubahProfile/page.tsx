import { UbahProfileForm } from "@/components/profile/ubah-profile-form";
import { currentUser } from "@/lib/utils";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (user.username === null) {
    redirect("/auth/username");
  }

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <>
      <section className=" p-5 md:py-10 flex flex-col ">
        <UbahProfileForm user={user} />
      </section>
    </>
  );
};

export default Page;
