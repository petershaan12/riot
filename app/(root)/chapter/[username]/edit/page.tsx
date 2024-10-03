import { getUserByUsernameAdmin } from "@/app/actions/auth";
import { UbahOrganisasiForm } from "@/components/Chapter/ubah-Chapter-form";
import { redirect } from "next/navigation";

type UpdateEventProps = {
  params: { username: string };
};

const Page = async ({ params: { username } }: UpdateEventProps) => {
  const user = await getUserByUsernameAdmin(username);

  if (!user) {
    redirect("/404");
  }

  return (
    <section className=" p-5 md:py-10 flex flex-col ">
      <UbahOrganisasiForm user={user.user} isOAuth={user.isOAuth} />
    </section>
  );
};

export default Page;
