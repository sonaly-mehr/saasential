"use client";
import { DeleteSite } from "@/app/actions/site.action";
import UploadImageForm from "@/components/layout/Form/UploadImageForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition, use, useState, useTransition } from "react";
import { toast } from "sonner";

const page = ({ params }: { params: Promise<{ siteId: string }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { siteId } = use(params);

  const handleDelete = async () => {
    setLoading(true);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("siteId", siteId);

      const success = await DeleteSite(formData);

      setLoading(false); // Reset loading state

      if (success) {
        toast.success("Site deleted successfully!");
        router.push("/dashboard/sites");
      } else {
        toast.error("Failed to delete the site.");
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
      </div>

      <UploadImageForm siteId={siteId} />

      <Card className="border-red-500 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-500">Danger</CardTitle>
          <CardDescription>
            This will delete your site and all articles associated with it.
            Click the button below to delete everything
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <SubmitButton
            text="Delete Everything"
            variant="destructive"
            onClick={handleDelete}
            loading={loading}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default page;
