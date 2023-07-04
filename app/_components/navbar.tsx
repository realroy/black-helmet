"use client";

import Link from "next/link";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { DollarSignIcon, LogOutIcon, UserCircle2Icon } from "lucide-react";
import { PopoverContent, Popover, PopoverTrigger } from "@/components/popover";

export type NavbarProps = {
  user?: Session["user"];
};

const itemClassName =
  "w-full transition-all hover:bg-slate-800 p-3 cursor-pointer";

export function Navbar({ user }: NavbarProps) {
  const isAuth = !!user;

  return (
    <nav className="min-h-full">
      <div className="flex flex-col items-center justify-between bg-slate-950 text-white h-full">
        <div>
          <Link href={"/"}>
            <div className="text-center p-3">
              <h3 className="text-lg font-semibold">Bh</h3>
            </div>
          </Link>
          <div className="my-8"></div>
          <Link href={"/quotations"} title="Quotations">
            <div className={itemClassName}>
              <DollarSignIcon />
            </div>
          </Link>
        </div>
        {isAuth ? (
          <div className="flex flex-col items-center">
            <Popover>
              <PopoverTrigger asChild>
                <div className={itemClassName}>
                  <UserCircle2Icon />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80" side="right" sideOffset={16}>
                <div className="flex flex-col">
                  <div className="p-4">
                    <h3 className="text-sm">{user.email}</h3>
                  </div>
                  <Button
                    variant={"secondary"}
                    className="w-full"
                    icon={<LogOutIcon />}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </div>
    </nav>
  );
}
