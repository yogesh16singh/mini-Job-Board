"use client";
import Link from "next/link";
import { Rocket, Building2, SearchCheck, Briefcase, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [loadingJobs, setLoadingJobs] = useState<boolean>(false);
  const [loadingCompany, setLoadingCompany] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto mb-4 max-w-4xl text-center md:mb-12">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Job <span className="text-amber-700">Board</span>
        </h1>
        <p className="mb-4 text-lg text-gray-600 md:mb-8 md:text-xl">
        Your Dream Job, Just a Click Away!
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-8 md:grid-cols-2">
        <Card className="transform transition-all duration-300 ease-in-out hover:shadow-xl">
          <CardHeader className="flex flex-row items-center space-x-4">
            <UserRound className="text-blue-600" size={40} />
            <CardTitle>Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Explore hundreds of job opportunities across multiple industries
            </p>
            <Link href="/candidate/jobs">
              <Button
                onClick={() => setLoadingJobs(true)}
                disabled={loadingJobs}
                variant="outline"
                className="w-full"
              >
                <SearchCheck className="mr-2" /> Browse Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transform transition-all duration-300 ease-in-out hover:shadow-xl">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Building2 className="text-green-600" size={40} />
            <CardTitle>Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Post jobs, manage applications, and find your next great talent
            </p>
            <Link href="/company/jobs">
              <Button
                onClick={() => setLoadingCompany(true)}
                disabled={loadingCompany}
                variant="outline"
                className="w-full"
              >
                <Briefcase className="mr-2" /> Company Portal
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
