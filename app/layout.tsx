import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import Loading from "./(root)/loading";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RIOT",
  description: "Running is our therapy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn("bg-[#131517] text-white", poppins.className)}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
