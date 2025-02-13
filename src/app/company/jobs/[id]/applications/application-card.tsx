"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
type ApplicationCard = {
  id: string;
  name: string;
  email: string;
  resumeLink: string;
  coverLetter: string;
  createdAt: Date;
};
const ApplicationCard = ({ application }: { application: ApplicationCard }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Card
        key={application.id}
        className="border border-white/80 bg-white/50 bg-gradient-to-br from-white/50 to-transparent shadow-xl ring-1 ring-blue-100 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
      >
        <CardContent className="p-3 md:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Applicant Details */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Applicant Name</p>
                <p className="font-medium">{application.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Applied On</p>
                <p className="font-medium">
                  {format(application.createdAt, "dd/MM/yyyy")}
                </p>
              </div>
            </div>

            {/* Resume & Cover Letter */}
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-500">Resume</p>
                <Link
                  href={application.resumeLink}
                  className="text-blue-600 hover:underline"
                >
                  View Resume
                </Link>
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-500">Cover Letter</p>
                <p className="line-clamp-3 text-sm text-gray-600">
                  {application.coverLetter}
                </p>

                <button
                  onClick={() => setOpen(true)}
                  className="text-sm underline underline-offset-1"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-2xl"
        >
          <DialogHeader>
            <DialogTitle>Cover Letter - {application.name}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <p className="whitespace-pre-wrap text-gray-700">
              {application.coverLetter}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationCard;
