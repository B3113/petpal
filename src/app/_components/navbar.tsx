"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Link,
  Button,
} from "@nextui-org/react";

export default function Navbars() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand className="gap-3">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden w-10 h-10"
        />
        <Link
        className="text-xl text-black cursor-pointer font-bold md:p-5 hover:opacity-50"
        href="/#home"
        >
        Pet-Pal
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8 text-sm" justify="center">
        <Link
        className="text-sm cursor-pointer text-black hover:opacity-50"
        href="/#home"
        >
        Home
        </Link>
        <Link
        className="text-sm cursor-pointer text-black hover:opacity-50"
        href="/#adoption"
        >
        Adoption
        </Link>
        <Link
        className="text-sm cursor-pointer text-black hover:opacity-50"
        href="/#aboutus"
        >
        About us
        </Link>
        <Link
        className="text-sm cursor-pointer text-black hover:opacity-50"
        href="/#contact"
        >
        Contact
        </Link>
      </NavbarContent>
      <NavbarContent className="text-sm" justify="end">
        <div className="cursor-pointer hover:opacity-60 hidden lg:flex">
          Sign in
        </div>

        <Button as={Link} color="default" href="#" variant="flat">
          Sign Up
        </Button>
      </NavbarContent>
    </Navbar>
  );
}



