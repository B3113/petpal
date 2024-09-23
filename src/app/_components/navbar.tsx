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
        <p className="text-xl cursor-pointer font-bold md:p-5">Pet-Pal</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8 text-sm" justify="center">
        <div className="cursor-pointer hover:text-[#7827C8]">Home</div>
        <div className="cursor-pointer hover:text-[#7827C8]">Adoption</div>
        <div className="cursor-pointer hover:text-[#7827C8]">About us</div>
        <div className="cursor-pointer hover:text-[#7827C8]">Contact</div>
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



