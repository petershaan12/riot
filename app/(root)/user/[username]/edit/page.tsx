import { getUserByUsername } from "@/app/actions/auth";
import { UbahProfileForm } from "@/components/profile/ubah-profile-form";

type UpdateEventProps = {
  params: { username: string };
};

const Page = async ({ params: { username } }: UpdateEventProps) => {
  const user = await getUserByUsername(username);

  return (
    <section className=" p-5 md:py-10 flex flex-col ">
      <UbahProfileForm user={user} isAdmin={true} />
    </section>
  );
};

export default Page;
