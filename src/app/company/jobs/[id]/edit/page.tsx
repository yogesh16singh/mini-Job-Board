import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server/db";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import JobPostingForm from "../../new/job-posting-form";

export default async function EditJobPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jobId = (await params).id;
  const dynamic = "force-dynamic";
  const job = await db.job.findFirst({
    select: {
      title: true,
      company: true,
      category: true,
      location: true,
      description: true,
      salaryRange: true,
    },
    where: {
      id: jobId,
      deletedAt: null,
    },
  });

  if (!job) {
    redirect("/");
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 flex items-center md:mb-6">
            <Link href="/company/jobs">
              <Button variant="ghost" className="gap-2 px-0">
                <ChevronLeft className="h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
          </div>

          <Card className="border border-white/80 bg-white/50 bg-gradient-to-br from-white/50 to-transparent shadow-xl ring-1 ring-blue-100 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-xl md:text-2xl">
                Edit Job Post
              </CardTitle>
              <CardDescription>
                Change the details to update the job post
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <JobPostingForm job={job} isEditing={true} jobId={jobId} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
