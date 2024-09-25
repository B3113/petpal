"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Link,
  Button,
  Avatar,
  User,
} from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import { type Session } from "next-auth";

type Props = {
  session: Session;
};

export default function Navbars({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  console.log(session);

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand className="gap-3">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="h-10 w-10 sm:hidden"
        />
        <Link
          className="cursor-pointer text-xl font-bold text-black hover:opacity-50 md:p-5"
          href="/#home"
        >
          Pet-Pal
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-8 text-sm sm:flex" justify="center">
        <Link
          className="cursor-pointer text-sm text-black hover:opacity-50"
          href="/#home"
        >
          Home
        </Link>
        <Link
          className="cursor-pointer text-sm text-black hover:opacity-50"
          href="/#adoption"
        >
          Adoption
        </Link>
        <Link
          className="cursor-pointer text-sm text-black hover:opacity-50"
          href="/#aboutus"
        >
          About us
        </Link>
        <Link
          className="cursor-pointer text-sm text-black hover:opacity-50"
          href="/#contact"
        >
          Contact
        </Link>
      </NavbarContent>
      <NavbarContent className="text-sm" justify="end">
        {session ? (
          <User
            avatarProps={{ radius: "lg", src: session.user.image ?? "" }}
            name={session.user.name}
          ></User>
        ) : (
          <Button
            onClick={async () => {
              await signIn("google", {
                callbackUrl: "/admin",
              });
            }}
            color="secondary"
            variant="flat"
          >
            Login
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}
