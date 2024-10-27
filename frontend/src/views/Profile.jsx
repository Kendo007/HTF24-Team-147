import Navbar from "@/components/navbar/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import BgPattern from "@/utils/BgPattern";
import { CalendarIcon, User2Icon } from "lucide-react";
import React from "react";

export default function Profile() {
  // Sample data - replace with real data from your backend
  const profile = {
    id: 1,
    name: "Senior React Developer",
    description: "TechCorp",
    date: "2024-10-20",
  };

  return (
    <>
      <Navbar />
      <BgPattern />
      <div className="min-h-screen bg-slate-950 p-6 relative">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User2Icon className="h-8 w-8 text-blue-500" />
              <TypographyH1>Profile</TypographyH1>
            </div>
          </div>

          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="p-6 rounded-lg flex gap-2 items-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{profile.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <span>{profile.description}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Joined on {profile.date}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
