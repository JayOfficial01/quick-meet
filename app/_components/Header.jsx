"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Logo from "./Logo";

function Header() {
  return (
    <header className="fixed w-full flex items-center justify-between p-5 shadow-sm z-10 bg-white">
      <Link href="/">
        <Logo />
      </Link>

      <ul className="hidden md:flex items-center justify-between gap-14 font-medium text-lg">
        <li className="cursor-pointer hover:text-primary transition-all duration-300">
          Product
        </li>
        <li className="cursor-pointer hover:text-primary transition-all duration-300">
          Pricing
        </li>
        <li className="cursor-pointer hover:text-primary transition-all duration-300">
          Contact us
        </li>
        <li className="cursor-pointer hover:text-primary transition-all duration-300">
          About us
        </li>
      </ul>

      <article className="flex items-center gap-3">
        <LoginLink>
          <Button variant="ghost">Login</Button>
        </LoginLink>

        <RegisterLink>
          <Button>Get Started</Button>
        </RegisterLink>
      </article>
    </header>
  );
}

export default Header;
