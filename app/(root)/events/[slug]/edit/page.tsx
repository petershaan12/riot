import { getUrlEvent } from "@/app/actions/events";
import { EventForm } from "@/components/events/event-form";
import TidakDitemukan from "@/components/shared/TidakDitemukan";
import { currentUser } from "@/lib/utils";

type UpdateEventProps = {
  params: { slug: string };
};

const Page = async ({ params: { slug } }: UpdateEventProps) => {
  const user = await currentUser();
  const event = await getUrlEvent(slug);

  if (!user.role.includes("ORGANIZATION") && !user.role.includes("ADMIN")) {
    return "You are not authorized to access this page";
  }

  if (!event) {
    return <TidakDitemukan />;
  }

  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h1 className="text-5xl uppercase font-bold">Edit Events</h1>
            <p className="opacity-50">Edit your event here</p>
          </div>
          <EventForm
            userId={user.id}
            type="edit"
            eventId={event?.id}
            event={event}
          />
        </div>
      </section>
    </>
  );
};

export default Page;
