import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex flex-col items-center justify-center text-center gap-2 md:gap-5">
          <p>riot indonesia</p>
          <h1 className=" uppercase mb-8 leading-8 font-monument-bold text-4xl md:text-[80px] md:leading-[65px]   ">
            <span className="md:text-[80px]">Running Is </span> <br /> Our{" "}
            <span className="text-primary">Therapy</span>{" "}
          </h1>
          <Image
            src="/assets/images/banner.png"
            width={1091}
            height={491}
            alt="riot_banner"
            className=""
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col items-center gap-8 md:gap-12"
      >
        <h2 className="uppercase font-monument-bold text-3xl tracking-wider md:leading-[65px] ">
          Events
        </h2>
        <div className="flex flex-col w-full gap-5 md:flex-row">
          Search CategoryFilter
        </div>
      </section>
    </>
  );
}
