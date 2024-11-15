"use client";
import { UpdateImage } from "@/app/actions/site.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { UploadDropzone } from "@/lib/uploadThingComponent";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const UploadImageForm = ({ siteId }: { siteId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    setLoading(true);

    if (!imageUrl) {
      toast.error("Please upload an image before submitting.");
      setLoading(false);
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("siteId", siteId);
      formData.append("imageUrl", imageUrl);

      const success = await UpdateImage(formData);

      setLoading(false); // Reset loading state

      if (success) {
        toast.success("Image has been updated successfully!");
        router.push(`/dashboard/sites/${siteId}`);
      } else {
        toast.error("Failed to update the image.");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is the image of your site. you can change it here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={200}
            height={200}
            className="size-[200px] object-cover rounded-lg"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            className="cursor-pointer"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Image has been uploaded");
            }}
            onUploadError={() => {
              toast.error("Something went wrong.");
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <SubmitButton
          text="Update Image"
          onClick={handleSubmit}
          loading={loading}
        />
      </CardFooter>
    </Card>
  );
};

export default UploadImageForm;
