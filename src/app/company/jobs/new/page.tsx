import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JobPostingForm from "./job-posting-form";
export default function AddNewJob() {
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

          <Card className="border border-white/80 bg-white/50 bg-gradient-to-br from-white/50 to-transparent shadow-xl ring-1 ring-blue-100 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl md:p-6">
            <CardHeader className="px-3 md:px-6">
              <CardTitle className="text-2xl">Post a New Job</CardTitle>
              <CardDescription>
                Fill out the form below to create a new job listing
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <JobPostingForm
                job={undefined}
                isEditing={false}
                jobId={undefined}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
