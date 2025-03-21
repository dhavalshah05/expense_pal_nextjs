import Header from "@/features/shared/components/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="grid grid-cols-1 grid-rows-[auto_1fr] h-screen">
        <Header />
        {children}
      </main>
  );
}
