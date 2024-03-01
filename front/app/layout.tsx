import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

const DashboardHeader = ({ children }) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">bsample</h1>
        <p className="text-lg text-muted-foreground">bsample</p>
      </div>
      {children}
    </div>
  )
}

export const Header = () => {
  return (
    <div className="fixed flex justify-between px-8 w-screen h-16 bg-teal-400 items-center drop-shadow-2xl border-b border-gray-300 shadow-md">
      <h1 className="font-bold text-2xl">bsample</h1>
      <div className="flex gap-3">
        <Button variant="outline">
          <a href="https://ui.shadcn.com/docs">ログイン</a>
        </Button>
        <Button>ログイン</Button>
      </div>
    </div>
  );
};

const SiteHeader = () => {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href={'TODO'} target="_blank" rel="noreferrer" >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <span className="sr-only">ログイン</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}


