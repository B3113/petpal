import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
  if (session?.user.role !== "admin") {
    return redirect("/");
  }
  return <div>{children}</div>;
}
