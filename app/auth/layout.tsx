export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col w-screen bg-gradasi">
      <main className="flex-1 z-10 justify-center flex flex-col  items-center ">
        {children}
      </main>
    </div>
  );
}
