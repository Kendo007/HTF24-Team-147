import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import BgPattern from "@/utils/BgPattern";
import React from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <BgPattern />
      <div className="relative min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center gap-8">
        <TypographyH1>Welcome to JobVilla</TypographyH1>
        <a href="/login">
          <Button>Get Started</Button>
        </a>
      </div>
    </>
  );
}
