import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster";
import { LoginUserProvider } from "@/app/LoginUserProvider"
import { Header } from "@/app/Header"
import { gql } from 'graphql-request'
import { getFetcher } from "@/lib/fetch"

const fetcher = getFetcher();
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bsample",
  description: "a sample app for business use",
};

const loginUserQuery = gql`
  {
    loginUser {
      id
      name
      email {
        email
      }
    }
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = {
  //   id: 'identifier',
  //   name: 'motojouya',
  //   email: 'motojouya@example.com',
  // };
  const user = fetcher(loginUserQuery, null);
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
