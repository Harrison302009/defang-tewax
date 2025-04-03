import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SessionWrapper from "@/components/session-layout/session-layout";

const exo = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deploy with Defang",
  description: "Deploy your Next.js app with Defang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo.className}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
