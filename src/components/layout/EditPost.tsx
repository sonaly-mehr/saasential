"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { deletePost } from "@/app/actions/post.action";
import { toast } from "sonner";
import { set } from "zod";
import { useRouter } from "next/navigation";

const EditPost = ({ item, siteId }: { item: any; siteId: string | undefined }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const HandleDelete = async (postId: string) => {
    setLoading(true);
    const res = await deletePost(postId);
    setLoading(false);
    console.log(res);
    if (res) {
      toast.success("Post has been deleted successfully");
      router.push(`/dashboard/sites/${siteId}`)
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="size-4 mr-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/sites/${siteId}/edit/${item.id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <div
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer text-sm font-normal px-2 hover:text-red-500"
              >
                Delete
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    HandleDelete(item?.id);
                    setIsDialogOpen(false);
                  }}
                >
                  {
                    loading ?  <Loader2 className="size-4 animate-spin" /> : "Delete"
                  }
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditPost;
