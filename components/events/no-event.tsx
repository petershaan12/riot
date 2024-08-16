import Image from "next/image";

type NoEventProps = {
  title: string;
};

const NoEvent = ({ title }: NoEventProps) => {
  return (
    <div className="md:w-[800px] my-5 flex justify-center items-center flex-col">
      <Image
        src="/assets/images/no-event.png"
        objectFit="cover"
        width={280}
        height={280}
        quality={100}
        priority
        alt="No Events Found"
      />
      <p className="text-lg md:text-2xl font-medium">{title}</p>
      <p className="mt-2 text-[#848484] text-xs md:text-base">
        Check back Later
      </p>
    </div>
  );
};

export default NoEvent;
