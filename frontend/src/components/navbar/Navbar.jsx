import React from "react";
import { TypographyH1 } from "../ui/typography";
import { Input } from "../ui/input";
import { BellIcon, MenuIcon, PlusIcon, SearchIcon } from "lucide-react";
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
    { label: "home", url: "/" },
    { label: "jobs", url: "/jobs" },
    { label: "chat", url: "/chat" },
    { label: "inbox", url: "/inbox" },
  ];
  return (
    <>
      <nav className="fixed left-0 top-0 w-full px-8 flex h-20 gap-4 items-center border-b">
        <TypographyH1>JobVilla</TypographyH1>
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
            <DropdownMenuItem asChild className="cursor-pointer">
              <a href="/">Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <a href="/">Login</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <a href="/">Sign Out</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="h-20 mb-4" />
    </>
  );
}
