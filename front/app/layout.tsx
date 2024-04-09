import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster";
import { LoginUserProvider } from "@/app/LoginUserProvider"
import { Header } from "@/app/Header"

import { gql, GraphQLClient } from 'graphql-request'

const serverHost = process.env.server_host;
const serverPort = process.env.server_port;
const client = new GraphQLClient(`https://${serverHost}:${serverPort}/api/graphql/`);
const document = gql`
  {
    loginUser {
      id
      name
      email
    }
  }
`;

type GetLoginUser = () => Promise<User | null>
const getLoginUser = () => {
  return await client.request(document)
};

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
  // const user = {
  //   id: 'identifier',
  //   name: 'motojouya',
  //   email: 'motojouya@example.com',
  // };
  const user = getLoginUser();
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
