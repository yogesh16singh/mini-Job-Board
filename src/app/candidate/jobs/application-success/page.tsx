import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ApplicationSuccessPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="rounded-lg bg-white p-8 shadow">
        <h1 className="mb-4 text-xl font-semibold text-gray-900 md:text-2xl">
          Application Submitted Successfully!
        </h1>
        <p className="mb-8 text-gray-600">
          Thank you for your application. We will review it and get back to you
          soon.
        </p>
        <Link href="/candidate/jobs">
          <Button>Back to Job Listings</Button>
        </Link>
      </div>
    </div>
  );
}
