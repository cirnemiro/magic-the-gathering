import type { Metadata } from "next";
import "./globals.css";
import { ProvidersWrapper } from "components/ui/providers/ProvidersWrapper";
import NavBar from "components/ui/components/sections/NavBar/NavBar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Magic: The Gathering - Cards and Collections",
  description:
    "Discover and organize your Magic: The Gathering cards. Filter, collect, and customize your experience with the most epic card game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <ProvidersWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
            <main className="bg-slate-200 h-screen">
              <div className="max-h-screen max-w-[1400px] mx-auto">
                {children}
              </div>
            </main>
          </Suspense>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
