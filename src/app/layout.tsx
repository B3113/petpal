import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Petpal",
  description: "Pet Adoption Center",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
