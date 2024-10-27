import React from "react";
import { TypographyH1 } from "../ui/typography";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const links = [
    { label: "dashboard", url: "/dashboard" },
    { label: "jobs", url: "/jobs" },
    { label: "chat", url: "/" },
    { label: "inbox", url: "/" },
  ];
  const avatarLinks = [
    { label: "profile", url: "/profile" },
    { label: "sign out", url: "/" },
  ];

  return (
    <>
      <nav className="fixed z-20 bg-background left-0 top-0 w-full px-8 flex h-20 gap-4 items-center border-b">
        <a href="/">
          <TypographyH1>JobVilla</TypographyH1>
        </a>
        <div className="grow flex p-2 gap-2 items-center justify-center">
          {links.map((ele, id) => (
            <Button
              key={id}
              variant="ghost"
              className="capitalize text-lg"
              asChild
            >
              <a href={ele.url}>{ele.label}</a>
            </Button>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {avatarLinks.map((ele, id) => (
              <DropdownMenuItem
                key={id}
                asChild
                className="cursor-pointer capitalize"
              >
                <a href={ele.url}>{ele.label}</a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" className="capitalize text-lg" asChild>
          <a href="/login">Login</a>
        </Button>
      </nav>
      <div className="h-20 mb-4" />
    </>
  );
}
