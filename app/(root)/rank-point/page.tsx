import Rank from "@/components/rank/rank";
import RankLimitsUpdate from "@/components/rank/rank-limits-update";
import { currentUser } from "@/lib/utils";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!user.role.includes("0")) {
    return "You are not authorized to access this page";
  }

  return (
    <>
      <section className="bg-contain p-5 md:pt-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h1 className="text-2xl md:text-5xl uppercase font-bold">
              Rank Point
            </h1>
            <p className="opacity-50">Update Rank Point </p>
          </div>
        </div>
      </section>

      <section>
        <RankLimitsUpdate />
      </section>
    </>
  );
};

export default Page;
