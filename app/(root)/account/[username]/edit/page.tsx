import { getUserByUsernameAdmin } from "@/app/actions/auth";
import { UbahProfileForm } from "@/components/profile/ubah-profile-form";
import { notFound } from "next/navigation";

type UpdateEventProps = {
  params: { username: string };
};

const Page = async ({ params: { username } }: UpdateEventProps) => {
  const user = await getUserByUsernameAdmin(username);

  if (!user) {
    notFound();
  }

  return (
    <section className=" p-5 md:py-10 flex flex-col ">
      <UbahProfileForm user={user.user} isOAuth={user.isOAuth} isAdmin={true} />
    </section>
  );
};

export default Page;
