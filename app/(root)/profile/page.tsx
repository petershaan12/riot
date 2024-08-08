import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { Calendar } from "lucide-react";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  console.log(session.user);

  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex items-center justify-center text-center gap-5">
          <Avatar className="cursor-pointer w-[200px] h-[200px]">
            <AvatarImage src={session?.user?.image || ""} className="" />
            <AvatarFallback>PS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <h1 className="text-3xl uppercase font-bold">
              {session?.user?.name}
            </h1>
            <p className="opacity-50">@petershaan_</p>
            <p className="flex items-center font-light  opacity-50 text-sm ">
              {" "}
              <Calendar className="w-4 mr-2 " strokeWidth={2} />
              {/* Joined on {session?.user?.createdAt} */}
            </p>
            <p>Selalu Semangat</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
