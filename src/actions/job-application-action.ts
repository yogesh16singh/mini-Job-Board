'use server'

import { formSchema } from "@/app/candidate/apply/[jobId]/job-application-form"
import { db } from "@/server/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

type ISubmitApplicationForm = {
    data: z.infer<typeof formSchema>
    jobId: string;
}
export const submitApplicationAction = async ({ data, jobId }: ISubmitApplicationForm) => {
    //find the job with that id

    try{
    const findJob = await db.job.findFirst({
        where: {
            id: jobId,
            deletedAt: null
        }
    })

    if (!findJob) {
        return {
            error: "The job you are trying to apply no longer exists."
        }
    }

    const application=await db.application.create({
        data: {
            name: data.name,
            email: data.email,
            resumeLink: data.resumeLink,
            coverLetter: data.coverLetter,
            jobId: jobId
        },
    })

    if(!application)
    {
        return {
            error:"Error in submitting the application."
        }
    }

    revalidatePath(`/company/jobs/${jobId}/applications`)
    return {
        message:"Application submitted successfully."
    }
}
catch(err)
{ console.log("error in catch block",err);
    return{
        error:"Error occured in submitting application."
    }
}
}