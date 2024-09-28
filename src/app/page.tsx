import React from "react";
import Navbar from "./_components/navbar";
import Home from "./_components/home";
import Adoption from "./_components/adoption";
import Aboutus from "./_components/aboutus";
import Contact from "./_components/contact";
import { getServerAuthSession } from "~/server/auth";
import { type Session } from "next-auth";

export default async function page() {
  const session = await getServerAuthSession();
  return (
    <div>
      <Navbar session={session!} />
      <Home />
      <Adoption session={session!} />
      <Aboutus />
      <Contact />
    </div>
  );
}
