import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col ">
      <div className="css-gradient bg-custom-gradient"></div>
      <Header />
      <main className="flex-1 z-10 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
