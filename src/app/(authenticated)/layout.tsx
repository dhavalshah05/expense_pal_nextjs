import Header from "@/features/shared/components/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        {children}
    </>
  );
}
