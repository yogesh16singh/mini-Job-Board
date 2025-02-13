'use client'
import { deleteJob } from "@/actions/job-posting-action";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function EditDeleteDropDown({ jobId }: { jobId: string }) {
    const [open, setOpen] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const router = useRouter()

    const handleEdit = async (e: any) => {
        e.preventDefault()
        await router.push(`/company/jobs/${jobId}/edit`)
        setOpen(false);
    }

    const handleDelete = async () => {
        await deleteJob(jobId)
            .then((resp) => {
                if (resp.message) {
                    return toast({
                        title: "Success",
                        description: resp.message
                    })

                }
                if (resp.error) {
                    return toast({
                        title: "Error",
                        description: resp.error,
                        variant: "destructive"
                    })
                }
            })
            .catch((err) => {
                return toast({
                    title: "Error",
                    description: err,
                    variant: "destructive"
                })
            })
            .finally(() => {
                setOpenAlert(false);
            })
    }
    
    return (
        <>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Link href={`/company/jobs/${jobId}/edit`}>
                        <DropdownMenuItem onClick={handleEdit}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => setOpenAlert(true)} className="text-red-600 focus:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure you want to delete this job post?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this job post .
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Yes , Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}