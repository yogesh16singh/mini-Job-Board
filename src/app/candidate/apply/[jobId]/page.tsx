"use server";
import JobApplicationForm from "@/app/candidate/apply/[jobId]/job-application-form";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

const ApplicationPage = async ({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) => {
  const jobId = (await params).jobId;
  const dynamic = "force-dynamic";
  const job = await db.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    redirect("/");
  }
  return (
    <>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Card className="mb-8 overflow-hidden border border-white/80 bg-white/60 shadow-xl ring-1 ring-blue-100 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
          <CardContent className="p-3 md:p-6">
            <div className="mb-1 text-sm text-gray-500">Position</div>
            <h1 className="mb-4 text-xl font-semibold text-gray-900">
              {job.title}
            </h1>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-1 text-sm text-gray-500">Company</div>
                <div className="text-gray-700">{job.company}</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-500">Location</div>
                <div className="text-gray-700">{job.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-xl border border-white/80 bg-white/50 bg-gradient-to-br from-white/50 to-transparent p-3 shadow-xl ring-1 ring-blue-100 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl md:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Application Form
            </h2>
            <p className="mt-1 text-gray-600">
              Please complete all fields below
            </p>
          </div>

          <JobApplicationForm jobId={job.id} />
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
