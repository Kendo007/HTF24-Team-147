import React from "react";
import { TypographyH1 } from "../ui/typography";
import { Input } from "../ui/input";
import { BellIcon, MenuIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <>
      <nav className="fixed left-0 top-0 w-full px-8 flex h-20 gap-4 items-center">
        <TypographyH1>LoyalNFT</TypographyH1>
        <form className="grow flex m-2 p-2 gap-2 bg-gray-900 rounded items-center">
          <Input />
          <Button variant="ghost" className="py-1 px-3">
            <SearchIcon />
          </Button>
        </form>
        <div className="flex items-center gap-1">
          <a href="/">
            <Button variant="ghost" className="py-1 px-3">
              <MenuIcon />
            </Button>
          </a>
          <a href="/">
            <Button variant="ghost" className="py-1 px-3">
              <PlusIcon />
            </Button>
          </a>
          <a href="/">
            <Button variant="ghost" className="py-1 px-3">
              <BellIcon />
            </Button>
          </a>
        </div>
      </nav>
      <div className="h-20 mb-4" />
    </>
  );
}
