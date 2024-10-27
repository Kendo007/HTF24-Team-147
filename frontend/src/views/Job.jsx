import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import React from "react";
import { useParams } from "react-router-dom";

export default function Job() {
  const params = useParams(); // has the JobId
  const job = {
    title: "Frontend Engineer",
    company: "Acme Corporation",
    location: "Remote",
    description:
      "We are looking for a talented Frontend Engineer to join our team. You will be responsible for developing and maintaining our web applications.",
    requirements: [
      "Strong proficiency in JavaScript, HTML, and CSS",
      "Experience with React or Angular",
      "Familiarity with REST APIs",
    ],
    benefits: ["Competitive salary", "Flexible work hours", "Health insurance"],
  };

  return (
    <>
      <Navbar />
      <div className="my-6">
        <div className="my-4">
          <TypographyH1>{job.title}</TypographyH1>
          <TypographyH4>{job.company}</TypographyH4>
          <TypographyH4>{job.location}</TypographyH4>
        </div>
        <TypographyH4 className="my-6">{job.description}</TypographyH4>
        <div className="my-4">
          <TypographyH2>Requirements</TypographyH2>
          <ul>
            {job.requirements.map((requirement) => (
              <li key={requirement} className="text-lg">
                {requirement}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-4">
          <TypographyH2>Benefits</TypographyH2>
          <ul>
            {job.benefits.map((benefit) => (
              <li key={benefit} className="text-lg">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-around items-center my-4">
          <Button className="text-xl" size="lg" asChild>
            <a href="">Apply</a>
          </Button>
        </div>
      </div>
    </>
  );
}
