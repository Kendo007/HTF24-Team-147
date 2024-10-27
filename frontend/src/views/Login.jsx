import Navbar from "@/components/navbar/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2 } from "@/components/ui/typography";
import BgPattern from "@/utils/BgPattern";
import { AlertCircleIcon, BriefcaseIcon } from "lucide-react";
import React, { useState } from "react";

export default function Login() {
  const [showError, setShowError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowError(true);
    // Add your login logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setShowError(true);
    // Add your registration logic here
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-20rem)] bg-slate-950 flex items-center justify-center p-4">
        <BgPattern />

        <div className="w-full max-w-[440px] relative">
          {/* Logo and Branding */}
          <div className="flex items-center justify-center mb-8 space-x-2">
            <BriefcaseIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-white">JobConnect Pro</h1>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card className="bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Welcome back
                  </CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className="bg-slate-800 border-slate-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          className="bg-slate-800 border-slate-700"
                          required
                        />
                      </div>
                    </div>

                    {showError && (
                      <Alert
                        variant="destructive"
                        className="mt-4 bg-destructive/40"
                      >
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertDescription>
                          Invalid email or password. Please try again.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="mt-4 text-right">
                      <Button
                        variant="link"
                        className="text-blue-400 hover:text-blue-300 p-0"
                      >
                        Forgot password?
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full hover:bg-blue-500"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Registration Form */}
            <TabsContent value="register">
              <Card className="bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Create Account</CardTitle>
                  <CardDescription>
                    Enter your details to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="bg-slate-800 border-slate-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="name@example.com"
                          className="bg-slate-800 border-slate-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          className="bg-slate-800 border-slate-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          className="bg-slate-800 border-slate-700"
                          required
                        />
                      </div>
                    </div>

                    {showError && (
                      <Alert
                        variant="destructive"
                        className="mt-4 bg-destructive/40"
                      >
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertDescription>
                          Please check your input and try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </form>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full hover:bg-blue-500"
                    onClick={handleRegister}
                  >
                    Create Account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
