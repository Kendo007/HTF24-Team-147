import JobCard from "@/components/job/JobCard";
import Navbar from "@/components/navbar/Navbar";
import { TypographyH1 } from "@/components/ui/typography";
import ListRender from "@/utils/ListRender";
import React from "react";

export default function Jobs() {
  const jobs = [
    {
      title: "Frontend Engineer",
      company: "Acme Corporation",
      location: "Remote",
      description:
        "We are looking for a talented Frontend Engineer to join our team.",
    },
    {
      title: "Frontend Engineer",
      company: "Acme Corporation",
      location: "Remote",
      description:
        "We are looking for a talented Frontend Engineer to join our team.",
    },
    {
      title: "Frontend Engineer",
      company: "Acme Corporation",
      location: "Remote",
      description:
        "We are looking for a talented Frontend Engineer to join our team.",
    },
    {
      title: "Frontend Engineer",
      company: "Acme Corporation",
      location: "Remote",
      description:
        "We are looking for a talented Frontend Engineer to join our team.",
    },
    {
      title: "Frontend Engineer",
      company: "Acme Corporation",
      location: "Remote",
      description:
        "We are looking for a talented Frontend Engineer to join our team.",
    },
    {
      title: "Frontend Engineer",
      company: "Acme Corporation",
      location: "Remote",
      description:
        "We are looking for a talented Frontend Engineer to join our team.",
    },
    {
      title: "Frontend Engineer",
      company: "Acme Corporation",
      location: "Remote",
      description:
        "We are looking for a talented Frontend Engineer to join our team.",
    },
    {
      title: "Frontend Engineer",
      company: "Acme Corporation",
      location: "Remote",
      description:
        "We are looking for a talented Frontend Engineer to join our team.",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="mb-8 text-center">
        <TypographyH1>Jobs</TypographyH1>
      </div>
      <ListRender data={jobs} ItemRender={JobCard} />
    </>
  );
}
