import React from "react";
import Sidebar from "./sidebar";
import { getServerAuthSession } from "~/server/auth";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  return (
    <div className="flex">
      <Sidebar session={session!} />
      {children}
    </div>
  );
}
