import React from "react";
import Sidebar from "./sidebar";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/");
  }
  return (
    <div className="flex">
      <Sidebar session={session} />
      {children}
    </div>
  );
}
