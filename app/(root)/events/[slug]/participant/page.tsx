import { getParticipant, getUrlEvent } from "@/app/actions/events";
import TidakDitemukan from "@/components/shared/TidakDitemukan";
import { currentUser } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import AttendButton from "@/components/events/participant/attend-button";
import DeleteButton from "@/components/events/participant/delete-button";
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

  const participant = await getParticipant(event.id);

  if (!user.role.includes("ORGANIZATION") && !user.role.includes("ADMIN")) {
    return "You are not authorized to access this page";
  }

  if (event.userId !== user.id) {
    return "You are not authorized to access this page";
  }

  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h1 className="text-2xl md:text-5xl uppercase font-bold">
              Participant
            </h1>
            <p className="opacity-50">A list of participant </p>
          </div>
        </div>
      </section>
      <section className="md:w-[1200px] w-screen px-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead className="md:w-[200px]">Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participant?.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="hover:text-primary hover:underline">
                  <Link href={`/profile/${p.user.username}`} target="_blank">
                    {p.user.username}
                  </Link>
                </TableCell>
                <TableCell className="hover:text-primary hover:underline">
                  <Link href={`https://wa.me/${p.phone}`} target="_blank">
                    {p.phone}
                  </Link>
                </TableCell>
                <TableCell>{p.user.email}</TableCell>
                <TableCell className="text-right flex justify-end">
                  <AttendButton
                    attendanceId={p.id}
                    userId={p.user.id}
                    userPoints={p.user.points}
                    points={p.points}
                  />
                  <DeleteButton
                    attendanceId={p.id}
                    userId={p.user.id}
                    title={p.event.title}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Page;
