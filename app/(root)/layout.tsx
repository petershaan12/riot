import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Suspense } from "react";
import Loading from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col ">
      <div className="css-gradient bg-custom-gradient fixed -z-10 "></div>
      <Header />
      <Suspense fallback={<Loading />}>
        <main className="flex-1 mx-auto">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}
