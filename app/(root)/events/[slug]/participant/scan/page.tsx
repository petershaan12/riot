import { getParticipant, getUrlEvent } from "@/app/actions/events";
import QrScannerComponent from "@/components/events/participant/qrscanner";
import TidakDitemukan from "@/components/shared/TidakDitemukan";
import { currentUser } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type ParticipantEventSlug = {
  params: { slug: string };
};

const Page = async ({ params: { slug } }: ParticipantEventSlug) => {
  const user = await currentUser();
  const event = await getUrlEvent(slug);

  if (!user) {
    redirect("/auth/login");
  }

  if (!event) {
    return <TidakDitemukan />;
  }

  if (!user.role.includes("ORGANIZATION") && !user.role.includes("ADMIN")) {
    return "You are not authorized to access this page";
  }

  if (event.userId !== user.id) {
    return "You are not authorized to access this page";
  }

  return (
    <>
      <section className="bg-contain p-5 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col space-y-12  justify-center text-center">
          <Link href={`/events/${slug}/participant`} className="items-center ">
            <ArrowLeft className="w-4 hover:cursor-pointer" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-5xl uppercase font-bold">
              Scan Participant
            </h1>
            <p className="opacity-50">Please scan your participant</p>
          </div>
        </div>

        <QrScannerComponent points={event.category.points} />
      </section>
    </>
  );
};

export default Page;
