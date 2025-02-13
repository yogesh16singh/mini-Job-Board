'use client'
import postJob, { editJob } from "@/actions/job-posting-action"
import { Button } from "@/components/ui/button"
import { Form , FormField,FormControl,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BooleanSupportOption } from "prettier"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type JobPostingFormProps= {
  job?: z.infer<typeof jobFormSchema>
  isEditing:boolean
  jobId?:string
}

export const jobFormSchema = z.object({
    title: z.string({required_error:"Title is required."})
      .min(3, "Job title must be at least 3 characters")
      .max(100, "Job title must be less than 100 characters"),
    
    company: z.string({required_error:"Company name is required."})
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name must be less than 100 characters"),
    
    category: z.string({required_error:"Job Category is required."})
    .min(2,{message:"Category is required."}),
  
    location: z.string({required_error:"Location is required."})
      .min(2, "Location must be at least 2 characters")
      .max(100, "Location must be less than 100 characters"),
  
    salaryRange: z.string({required_error:"Salary range is required."})
      .min(1, "Salary range is required")
      .max(30, "Salary range is too long"),

    description: z.string({required_error:"Job description is required."})
      .min(50, "Job description must be at least 50 characters")
      .max(5000, "Job description must be less than 5000 characters"),
  })
  
  export default function JobPostingForm({job,isEditing,jobId}:JobPostingFormProps) {
    const router=useRouter();
      const [loading,setLoading]=useState<boolean>(false);
      const form=useForm<z.infer<typeof jobFormSchema>>({
          resolver:zodResolver(jobFormSchema),
          defaultValues:{
            title:job?.title || '',
            company:job?.company || '',
            category:job?.category || '',
            location:job?.location || '',
            salaryRange:job?.salaryRange || '',
            description:job?.description || ''
          }
        
      })
      const callServerAction=(data:z.infer<typeof jobFormSchema>)=>{
        if(isEditing && job && jobId)
        {
          return editJob({data,jobId})
        }
        else{
          return postJob({data})
        }
      }
      const onSubmit=async(data:z.infer<typeof jobFormSchema>)=>{
          setLoading(true);
  await callServerAction(data)
  .then((resp)=>{
      if(resp.message)
      {
        toast({
          title:"Success",
          description:resp.message
        })
        router.push('/company/jobs');
        return;
      }
      if(resp.error)
      {
  return toast({
    title:"Error",
    description:resp.error
  })

      }
  })
  .catch((err)=>{
  return toast({
    title:"Error",
    description:err,
    variant:"destructive"
  })
  })
  .finally(()=>{
      setLoading(false)
  })
      }
      return(
          <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job catgeory" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salaryRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Range</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter salary range" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter the job description..."
                            rows={9}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 justify-end">
                    <Link href="/company/jobs">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </Link>
                    <Button type="submit" disabled={loading}>
                    {isEditing ? "Edit Job Post":"Post Job"}
                    </Button>
                  </div>
                </form>
              </Form>
          </>
      )
  }