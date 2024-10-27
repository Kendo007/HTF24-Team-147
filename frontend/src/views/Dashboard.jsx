import Navbar from "@/components/navbar/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH1 } from "@/components/ui/typography";
import BgPattern from "@/utils/BgPattern";
import {
  BriefcaseIcon,
  Building2Icon,
  CalendarIcon,
  ClockIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  // Sample data - replace with real data from your backend
  const appliedJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp",
      date: "2024-10-20",
      status: "In Review",
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "StartupX",
      date: "2024-10-18",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "BigTech",
      date: "2024-10-15",
      status: "Applied",
    },
  ];

  const savedJobs = [
    { id: 4, title: "UI/UX Designer", company: "DesignCo", date: "2024-10-19" },
    {
      id: 5,
      title: "Product Manager",
      company: "InnovateCorp",
      date: "2024-10-17",
    },
  ];

  const postedJobs = [
    {
      id: 1,
      title: "JavaScript Developer",
      description: "Looking for an experienced JavaScript developer...",
      deadline: "2024-11-15",
      applications: 45,
    },
    {
      id: 2,
      title: "DevOps Engineer",
      description: "Seeking a DevOps engineer with AWS experience...",
      deadline: "2024-11-20",
      applications: 32,
    },
  ];

  const analyticsData = [
    { month: "Jun", applications: 65 },
    { month: "Jul", applications: 85 },
    { month: "Aug", applications: 73 },
    { month: "Sep", applications: 95 },
    { month: "Oct", applications: 120 },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Applied: "bg-blue-500",
      "In Review": "bg-yellow-500",
      "Interview Scheduled": "bg-green-500",
      Rejected: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <>
      <Navbar />
      <BgPattern />
      <div className="min-h-screen bg-slate-950 p-6 relative">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BriefcaseIcon className="h-8 w-8 text-blue-500" />
              <TypographyH1>Dashboard</TypographyH1>
            </div>
          </div>

          <Tabs defaultValue="jobseeker" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-4">
              <TabsTrigger value="jobseeker">Job Seeker</TabsTrigger>
              <TabsTrigger value="jobposter">Job Poster</TabsTrigger>
            </TabsList>

            {/* Job Seeker Dashboard */}
            <TabsContent value="jobseeker">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Applied Jobs Section */}
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Applied Jobs</CardTitle>
                    <CardDescription>
                      Track your job applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {appliedJobs.map((job) => (
                          <div
                            key={job.id}
                            className="p-4 rounded-lg bg-slate-800/50 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-white">
                                {job.title}
                              </h3>
                              <Badge
                                className={`${getStatusColor(job.status)}`}
                              >
                                {job.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-400">
                              <Building2Icon className="h-4 w-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-400">
                              <CalendarIcon className="h-4 w-4" />
                              <span>Applied on {job.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Saved Jobs Section */}
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Saved Jobs</CardTitle>
                    <CardDescription>Jobs you're interested in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {savedJobs.map((job) => (
                          <div
                            key={job.id}
                            className="p-4 rounded-lg bg-slate-800/50 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-white">
                                {job.title}
                              </h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-red-400"
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-400">
                              <Building2Icon className="h-4 w-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-400">
                              <CalendarIcon className="h-4 w-4" />
                              <span>Saved on {job.date}</span>
                            </div>
                            <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-500">
                              Apply Now
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Job Poster Dashboard */}
            <TabsContent value="jobposter">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Posted Jobs Section */}
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Posted Jobs</CardTitle>
                    <CardDescription>Manage your job postings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {postedJobs.map((job) => (
                          <div
                            key={job.id}
                            className="p-4 rounded-lg bg-slate-800/50 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-white">
                                {job.title}
                              </h3>
                              <Badge className="bg-blue-500">
                                {job.applications} Applications
                              </Badge>
                            </div>
                            <p className="text-slate-400 text-sm">
                              {job.description}
                            </p>
                            <div className="flex items-center space-x-2 text-slate-400">
                              <ClockIcon className="h-4 w-4" />
                              <span>Deadline: {job.deadline}</span>
                            </div>
                            <Button className="w-full mt-2">
                              View Applications
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Analytics Section */}
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Analytics</CardTitle>
                    <CardDescription>
                      Track your job posting performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-slate-800/50">
                          <div className="text-sm text-slate-400">
                            Total Applications
                          </div>
                          <div className="text-2xl font-bold text-white">
                            413
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800/50">
                          <div className="text-sm text-slate-400">
                            Positions Filled
                          </div>
                          <div className="text-2xl font-bold text-white">8</div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800/50">
                          <div className="text-sm text-slate-400">
                            Avg. Time to Fill
                          </div>
                          <div className="text-2xl font-bold text-white">
                            23d
                          </div>
                        </div>
                      </div>

                      <div className="h-[300px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={analyticsData}>
                            <defs>
                              <linearGradient
                                id="applicationGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#3B82F6"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#3B82F6"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#1e293b"
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #1e293b",
                                borderRadius: "6px",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="applications"
                              stroke="#3B82F6"
                              fillOpacity={1}
                              fill="url(#applicationGradient)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
