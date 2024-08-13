import Header from "@/components/shared/Header";
import TidakDitemukan from "@/components/shared/TidakDitemukan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found · Riot",
  description: "Not Found Riot",
};

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col ">
      <div className="css-gradient bg-custom-gradient"></div>
      <Header />
      <TidakDitemukan />
    </div>
  );
};

export default NotFound;
