import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster";
import { LoginUserProvider } from "@/app/LoginUserProvider"
import { Header } from "@/app/Header"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bsample",
  description: "a sample app for business use",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = null;
  const user = {
    id: 'id',
    name: 'name',
    email: 'email',
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginUserProvider user={user}>
          <Header />
            {children}
          <Toaster />
        </LoginUserProvider>
      </body>
    </html>
  );
}
