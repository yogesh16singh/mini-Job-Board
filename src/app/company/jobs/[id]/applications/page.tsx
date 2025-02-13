"use server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import ApplicationCard from "./application-card";

export default async function JobApplications({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jobId = (await params).id;
  const dynamic = "force-dynamic";
  //finding the applications with this jobId that is params.id
  const job = await db.job.findFirst({
    where: {
      id: jobId,
    },
    include: {
      applications: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!job) {
    redirect("/company/jobs");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Job Overview Section */}
      <Card className="mb-8 border border-white/80 bg-white/50 bg-gradient-to-br from-white/50 to-transparent shadow-xl ring-1 ring-blue-100 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="p-3 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-500">Job Position</p>
              <CardTitle className="mb-2 text-lg md:text-2xl">
                {job.title}
              </CardTitle>
              <p className="text-gray-600">{job.company}</p>
            </div>
            <Link href="/company/jobs">
              <Button variant="outline" className="px-2 py-1 md:px-4 md:py-2">
                Back to Jobs
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="text-gray-500">Total Applications</p>
              <p className="text-lg font-medium">{job.applications.length}</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="text-lg font-medium">{job.location}</p>
            </div>
            <div>
              <p className="text-gray-500">Category</p>
              <p className="text-lg font-medium">{job.category}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-6">
        <h2 className="px-1 text-lg font-semibold md:text-xl">Applications</h2>

        {job.applications.length === 0 ? (
          <Card className="border border-white/80 bg-white/50 bg-gradient-to-br from-white/50 to-transparent p-3 shadow-xl ring-1 ring-blue-100 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl md:p-6">
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No applications received yet.</p>
            </CardContent>
          </Card>
        ) : (
          job.applications.map((application) => (
            <ApplicationCard application={application} />
          ))
        )}
      </div>
    </div>
  );
}
