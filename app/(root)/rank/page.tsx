import { getAllUser } from "@/app/actions/rank";
import Rank from "@/components/rank/rank";

const Page = async () => {
  const allUsers = await getAllUser();

  if (!allUsers) {
    return <div>No users found</div>; // Handle the case when no users are returned
  }

  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h1 className="text-5xl uppercase font-bold">LEADERBOARDS</h1>
            <p className="opacity-50">The Rank</p>
          </div>
        </div>
      </section>

      <section className="p-5 rounded-lg">
        <Rank users={allUsers} />
      </section>
    </>
  );
};

export default Page;
