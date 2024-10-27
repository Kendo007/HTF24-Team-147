import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
} from "@/components/ui/typography";
import React from "react";

export default function PageNotFound() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center">
      <TypographyH1 className="my-10">Error: 404</TypographyH1>
      <TypographyH2 className="my-8">Page Not Found</TypographyH2>
      <Button variant="secondary" className="my-6" asChild>
        <a href="/">
          <TypographyH3>Go Back Home</TypographyH3>
        </a>
      </Button>
    </div>
  );
}
