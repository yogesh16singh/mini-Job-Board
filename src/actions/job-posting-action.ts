'use server'
import { jobFormSchema } from "@/app/company/jobs/new/job-posting-form"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { db } from "@/server/db"
type EditJobProps={
     data:z.infer<typeof jobFormSchema>
     jobId:string;
}
export default async function postJob({data}:{data: z.infer<typeof jobFormSchema>}) {
     //write action for creating the job
     try {
          const createJob = await db.job.create({
               data: {
                    category: data.category,
                    company: data.company,
                    description: data.description,
                    title: data.title,
                    salaryRange: data.salaryRange,
                    location: data.location
               }
          })

          if (!createJob) {
               return {
                    error: "Error in posting the job."
               }
          }
          revalidatePath("/company/jobs")
          return {
               message: "Job posted successfully"
          }
     }
     catch (err) {
          console.log("error in ctach block is", err)
          return {
               error: "Error occured in posting the job."
          }
     }
}

export async function deleteJob(jobId: string) {
     //find the job with this id
     try {
          const job = await db.job.findFirst({
               where: {
                    id: jobId
               }
          })

          if (!job) {
               return {
                    error: "The job you want to delete does not exist."
               }
          }

          await db.job.update({
               where: {
                    id: jobId
               },
               data: {
                    deletedAt: new Date()
               }
          })

          revalidatePath("/company/jobs");
          return {
               message: "Job deleted successfully"
          }
     }
     catch (err) {
          return {
               error: "Error in deleting the job."
          }
     }
}

export async function editJob({data,jobId}:EditJobProps){
   try{
     //find the job with jobId
     const job=await db.job.findFirst({
          where:{
               id:jobId
          }
     })
     if(!job)
     {
          return {
               error:"The job you want to edit does not exist."
          }
     }

    const updateJob= await db.job.update({
          where:{
               id:jobId
          },
          data:{
               title:data.title,
               salaryRange:data.salaryRange,
               location:data.location,
               description:data.description,
               category:data.category,
               company:data.company
          }
     })

     if(!updateJob)
     {
          return {
               error:"Error in updating the job."
          }
     }

     revalidatePath("/company/jobs");
     return{
          message:"Job updated successfully."
     }
   }

   catch(err)
   {
     return {
          error:"Error in editing the job post."
     }
   }
}



