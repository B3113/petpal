"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";
import { Button, Avatar, User } from "@nextui-org/react";
import { type Session } from "next-auth";

type Props = {
  session: Session;
};

export default function Sidebar({ session }: Props) {
  return (
    <div className="sticky top-0 h-screen w-60 flex-col bg-gray-100 p-4 py-10">
      <User
        avatarProps={{ radius: "lg", src: session.user.image ?? "" }}
        name={session.user.name}
        className="cursor-pointer"
      ></User>
      <nav className="flex-1">
        <ul className="mt-10 space-y-6">
          <li>
            <Button
              className="flex w-full items-center hover:opacity-70"
              variant="light"
              // onClick={() => onSelectPage("Pet_manage")}
            >
              <Icon className="h-4" icon="ic:round-history" />
              History
            </Button>
          </li>
          <li>
            <Button
              className="flex w-full items-center text-red-700 hover:opacity-70"
              variant="light"
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
