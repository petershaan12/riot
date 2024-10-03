import { OrganisasiForm } from "@/components/chapter/ChapterForm";
import { currentUser } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!user.role.includes("ADMIN")) {
    return "You are not authorized to access this page";
  }

  return (
    <section className="bg-contain p-5 md:py-10">
      <div className="flex flex-col items-center justify-center text-center gap-5">
        <div>
          <Link href={`/Chapter`}>
            <ArrowLeft className="w-4 hover:cursor-pointer mb-8 hover:text-primary" />
          </Link>
          <h1 className="text-2xl md:text-5xl uppercase font-bold">
            Create Organization
          </h1>
          <p className="opacity-50">Try make new Organization</p>
        </div>
        <OrganisasiForm />
      </div>
    </section>
  );
};

export default Page;