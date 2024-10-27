import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import React from "react";

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-20rem)] flex justify-center items-center">
        <div className="flex flex-col gap-6">
          <TypographyH2>Login</TypographyH2>
          <Button>Login</Button>
        </div>
      </div>
    </>
  );
}
