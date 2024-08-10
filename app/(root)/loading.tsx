export default function Loading() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-y-1">
        <img
          src={"/animation/loading.svg"}
          alt="Loading animation"
          className="w-16 h-16"
        />
        <div className="animate-fade-in text-xl">Loading...</div>
      </div>
    </>
  );
}
