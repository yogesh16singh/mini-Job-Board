"use server";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jobId = (await params).id;
  const dynamic = "force-dynamic";
  const job = await db.job.findUnique({
    where: {
      id: jobId,
      deletedAt: null,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-3 py-8 md:px-4">
      <Card className="border border-white/80 bg-white/50 bg-gradient-to-br from-white/50 to-transparent p-3 shadow-xl ring-1 ring-blue-100 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl md:p-6">
        <CardContent className="p-0 md:p-8">
          {/* Header with Company and Post Date */}
          <div className="mb-3 flex items-center justify-between md:mb-6">
            <h2 className="text-lg text-gray-700 md:text-xl">{job.company}</h2>
            <span className="text-sm text-gray-500">
              Posted on {format(job.createdAt, "dd/MM/yyyy")}
            </span>
          </div>

          {/* Job Title */}
          <h1 className="mb-6 text-xl font-semibold text-gray-900 md:text-3xl">
            {job.title}
          </h1>

          {/* Key Details */}
          <div className="mb-8 grid grid-cols-2 gap-y-4 border-y border-gray-200 py-6">
            <div>
              <div className="mb-1 text-sm text-gray-500">Location</div>
              <div className="text-gray-700">{job.location}</div>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-500">Category</div>
              <div className="text-gray-700">{job.category}</div>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-500">Salary Range</div>
              <div className="text-gray-700">{job.salaryRange}</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-medium text-gray-900">
              About the Role
            </h2>
            <div className="space-y-4 whitespace-pre-wrap text-gray-600">
              {job.description}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1 border-t border-gray-200 pt-4 md:gap-4">
            <Link href={`/candidate/apply/${job.id}`} className="flex-1">
              <Button className="w-full bg-gray-900 hover:bg-gray-800">
                Apply for this position
              </Button>
            </Link>
            <Link href="/candidate/jobs">
              <Button variant="outline">Back to Jobs</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
