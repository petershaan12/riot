import { getParticipant, getUrlEvent } from "@/app/actions/events";
import TidakDitemukan from "@/components/shared/TidakDitemukan";
import { currentUser } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import AttendButton from "@/components/events/participant/attend-button";
import DeleteButton from "@/components/events/participant/delete-button";
import { redirect } from "next/navigation";
import { ScanBarcode } from "lucide-react";
import PrintPdf from "@/components/events/participant/printpdf";
import React from "react";

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

  if (!user.role.includes("0") && !user.role.includes("1")) {
    return "You are not authorized to access this page";
  }

  if (event.userId !== user.id) {
    return "You are not authorized to access this page";
  }

  // Prepare data for PDF
  const pdfData =
    participant?.map((p) => ({
      name: p.user.name || "-",
      phone: p.phone || "-",
      email: p.user.email || "-",
      status: p.status || "-",
    })) ?? [];

  return (
    <>
      <section className="bg-contain p-5 md:pt-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h1 className="text-2xl md:text-5xl uppercase font-bold">
              Participant
            </h1>
            <p className="opacity-50">A list of participant </p>
          </div>
        </div>
      </section>
      <section className="flex justify-center mb-5 space-x-3 items-center">
        <Link
          href={`/events/${slug}/participant/scan`}
          className="flex bg-white text-black px-2 w-fit py-1 rounded-md hover:bg-white/60 hover:text-white"
        >
          <ScanBarcode /> <p>Scan</p>
        </Link>
        <PrintPdf
          data={pdfData}
          fileName={`${event.title}_participants.pdf`}
          eventTitle={event.title}
        />
      </section>
      <section id="participant-table" className="md:w-[1200px] w-screen px-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="md:w-[200px]">Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participant?.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="hover:text-primary hover:underline">
                  <Link href={`/${p.user.username}`} target="_blank">
                    {p.user.name}
                  </Link>
                </TableCell>
                <TableCell className="hover:text-primary hover:underline">
                  <Link href={`https://wa.me/${p.phone}`} target="_blank">
                    {p.phone}
                  </Link>
                </TableCell>
                <TableCell>{p.user.email}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell className="text-right flex justify-end">
                  <AttendButton
                    attendanceId={p.id}
                    userId={p.user.id}
                    points={p.points}
                    isAttend={p.status}
                  />
                  <DeleteButton
                    attendanceId={p.id}
                    userId={p.user.id}
                    title={p.event.title}
                    ticketId={p.ticketId}
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
