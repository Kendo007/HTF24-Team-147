import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { TypographyH3, TypographyH4, TypographyP } from "../ui/typography";

export default function JobCard({
  id = "12",
  title = "Frontend Engineer",
  company = "Acme Corporation",
  location = "Remote",
  description = "We are looking for a talented Frontend Engineer to join our team.",
}) {
  return (
    <a href={`/job/${id}`}>
      <Card className="max-w-96 hover:scale-105 transition hover:border-primary/50">
        <CardHeader>
          <TypographyH3>{title}</TypographyH3>
          <TypographyH4 className="text-muted-foreground">
            {company}
          </TypographyH4>
          <TypographyH4 className="text-muted-foreground">
            {location}
          </TypographyH4>
        </CardHeader>
        <CardContent>
          <TypographyP>{description}</TypographyP>
        </CardContent>
      </Card>
    </a>
  );
}
