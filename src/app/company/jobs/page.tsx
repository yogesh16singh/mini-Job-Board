"use server";

import { db } from "@/server/db";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  ChevronLeft,
  DollarSign,
  Edit,
  IndianRupee,
  MapPin,
  MoreVertical,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import EditDeleteDropDown from "./edit-delete-dropdown";
export default async function CompanyJobs() {
  const jobs = await db.job.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="container mx-auto px-5 py-8">
      <div className="flex items-center justify-between md:mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            className="gap-2 px-0 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:px-4"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
        <Link href="/company/jobs/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Post New Job</span>
            <span className="sm:hidden">New Job</span>
          </Button>
        </Link>
      </div>
      <div className="py-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800 md:mb-4 md:text-4xl">
          Company Job Postings
        </h1>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-lg bg-gray-50 py-12 text-center">
          <p className="text-2xl text-gray-600">
            You haven't posted any jobs yet. Click the "Post New Job" button to
            create your first job listing.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 md:px-6 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="relative transform bg-white transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute right-2 top-[13px] md:right-6 md:top-6">
                <EditDeleteDropDown jobId={job.id} />
              </div>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg font-semibold text-gray-800 md:text-xl">
                  {job.title}
                </CardTitle>
                <CardDescription className="flex items-center text-gray-600">
                  <Briefcase className="mr-2 text-blue-500" size={16} />
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                <div className="mb-4 space-y-3">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="mr-2 text-green-500" size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <IndianRupee className="mr-2 text-purple-500" size={16} />
                    <span>{job.salaryRange}</span>
                  </div>
                  <div className="inline-block rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
                    {job.category}
                  </div>
                </div>

                <Link href={`/company/jobs/${job.id}/applications`}>
                  <Button
                    variant="outline"
                    className="w-full hover:border-blue-300 hover:bg-blue-50"
                  >
                    View Applications
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
