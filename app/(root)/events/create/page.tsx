import { EventForm } from "@/components/events/event-form";

const Page = () => {
  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h1 className="text-5xl uppercase font-bold">Create Events</h1>
            <p className="opacity-50">Try make new Events</p>
          </div>
          <EventForm />
        </div>
      </section>
    </>
  );
};

export default Page;
