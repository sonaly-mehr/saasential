"use client";
import {  CreateSiteAction, SiteData } from "@/app/actions/site.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "@/components/ui/Forms/Form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFeild from "@/components/ui/Forms/InputField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { SiteCreationSchema } from "@/lib/validationSchema";

const page = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleSubmit = async (data: FieldValues) => {
    setLoading(true);
  
    const res = await CreateSiteAction(data as SiteData);
  
    if (res?.data) {
      // Success: Show toast and navigate to sites dashboard
      toast.success(res.message || "Site created successfully!");
      router.push("/dashboard/sites");
    } else if (res?.error) {
      // Error: Show toast with the error message
      toast.error(res.error);
      if (res?.redirectTo) {
        router.push(res.redirectTo);
      }
    } else {
      // Fallback error message
      toast.error("Something went wrong");
    }
  
    setLoading(false);
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="max-w-xl w-full p-5 shadow-md">
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>
            Create your Site here. Click the button below once your done...
          </CardDescription>
        </CardHeader>

        <Form onSubmit={handleSubmit} resolver={zodResolver(SiteCreationSchema)}>
          <div className="flex flex-col gap-3 mb-4">
            <InputFeild
              name="name"
              placeholder="Enter site name"
              label="Name"
            />
            <InputFeild
              name="description"
              placeholder="Enter site description"
              label="Description"
            />
            <InputFeild
              name="subdirectory"
              placeholder="Enter site subdirectory"
              label="Subdirectory"
            />
          </div>
            <SubmitButton text="Create Site" loading={loading} />

        </Form>
      </Card>
    </div>
  );
};

export default page;
