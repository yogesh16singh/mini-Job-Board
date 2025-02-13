export const dynamic = "force-dynamic";
import Link from "next/link";
import { Briefcase, ChevronLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
export default async function JobListingsPage() {
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
      <div className="flex items-center md:mb-6">
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
      </div>
      <div className="w-full py-4 md:p-6">
        <h1 className=" text-2xl text-center font-bold text-gray-800 md:mb-4 md:text-4xl">
          All Jobs
        </h1>

        {/* <div className="flex space-x-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search jobs..." 
              className="pl-10 w-full"
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 text-gray-500" size={20} />
              <SelectValue placeholder="Filter Jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-lg bg-gray-50 py-12 text-center">
          <p className="text-2xl text-gray-600">
            No jobs available at the moment
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 md:px-6 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="transform bg-white transition-all duration-300 hover:shadow-xl"
            >
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
                  <div className="inline-block rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
                    {job.category}
                  </div>
                </div>
                <Link href={`/candidate/jobs/${job.id}`}>
                  <Button
                    variant="outline"
                    className="w-full hover:border-blue-300 hover:bg-blue-50"
                  >
                    View Job Details
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
