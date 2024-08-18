import { getTicketQRCode } from "@/app/actions/qrcode";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateTime } from "@/lib/utils";
import { AttendanceStatus } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type SearchParamsProps = {
  params: { id: string };
};

const Page = async ({ params: { id } }: SearchParamsProps) => {
  const ticket: any = await getTicketQRCode(id);

  if (!ticket) {
    redirect("/404");
  }

  const attendanceStatus =
    ticket.attendance && ticket.attendance.length > 0
      ? ticket.attendance[0].status
      : "Unknown";
  // console.log("Attendance Status:", attendanceStatus);
  let statusColor;
  switch (attendanceStatus) {
    case "GOING":
      statusColor = "text-green-400";
      break;
    case "ATTENDED":
      statusColor = "text-red-500";
      break;
    default:
      statusColor = "gray";
  }

  return (
    <div className="flex h-screen flex-col w-screen bg-gradasi">
      <main className="flex-1 z-10 justify-center flex   items-center ">
        <div className="rounded-2xl bg-white w-[300px]  shadow-2xl text-black">
          <div className="p-4">
            <Badge className="rounded-md  bg-gray-500/20 text-black/60">
              TICKET
            </Badge>
            <h1 className="text-2xl font-medium uppercase text-black my-2">
              {ticket.event.title}
            </h1>
            <div className="opacity-80 text-sm">
              <p>{formatDate(ticket.event.date)}</p>
              <p className="text-xs mt-2">{ticket.event.location}</p>
            </div>
          </div>
          <div className="flex items-center justify-center border-y-2 border-dashed my-5">
            <Image
              src={ticket.qrCodeImage}
              alt="Ticket Barcode"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="px-4 pb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-50">Name: </p>
              <p className="font-medium">{ticket.user.name}</p>
            </div>
            <div>
              <p className="text-sm opacity-50">Status: </p>
              <p className={`font-medium ${statusColor} capitalize`}>
                {attendanceStatus}
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className="text-xs mx-auto mb-12 font-medium flex items-center space-x-3">
        <p>Made by </p>
        <Link className="underline cursor-pointer " href="/">
          <Image
            src="/assets/images/logo.svg"
            width={70}
            height={0}
            alt="riot Logo"
            className="mx-auto  "
          />
        </Link>
      </div>
    </div>
  );
};

export default Page;
