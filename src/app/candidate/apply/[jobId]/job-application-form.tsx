"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { submitApplicationAction } from "@/actions/job-application-action";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  resumeLink: z.string().url("Please enter a valid URL"),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
});
const JobApplicationForm = ({ jobId }: { jobId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      resumeLink: "",
      coverLetter: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await submitApplicationAction({ data, jobId })
      .then((resp) => {
        if (resp.message) {
          toast({
            title: "Success",
            description: resp.message,
          });
          router.push("/candidate/jobs/application-success");
          return;
        }

        if (resp.error) {
          return toast({
            title: "Error",
            description: resp.error,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        return toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form fields remain the same */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter you email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resumeLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Resume <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter drive link for your resume"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Cover Letter <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us why you're interested in this position..."
                    rows={7}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-1 pt-4 md:gap-4">
            <Button disabled={isLoading} type="submit" className="flex-1">
              Submit Application
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default JobApplicationForm;
