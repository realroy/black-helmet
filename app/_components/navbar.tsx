"use client";

import Link from "next/link";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export type NavbarProps = {
  user?: Session["user"];
};

export function Navbar({ user }: NavbarProps) {
  const isAuth = !!user;

  return (
    <nav className="sticky top-0">
      <Container className="flex items-center justify-between">
        <Link href={"/"}>
          <h3 className="text-md font-semibold">Black Helmet</h3>
        </Link>
        {isAuth ? (
          <div className="flex items-center">
            <h3 className="text-md">{user.email}</h3>
            <Button variant={"ghost"} onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        ) : (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </Container>
    </nav>
  );
}
