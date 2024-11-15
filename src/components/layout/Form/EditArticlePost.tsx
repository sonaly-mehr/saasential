"use client";
import { EditPostActions } from "@/app/actions/post.action";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import slugify from "react-slugify";
import { JSONContent } from "novel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Atom } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePostValidation } from "@/lib/validationSchema";
import InputFeild from "@/components/ui/Forms/InputField";
import TextareaField from "@/components/ui/Forms/TextAreaField";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadThingComponent";
import TailwindEditor from "@/components/ui/Forms/Editor/EditorWrapper";
import { SubmitButton } from "@/components/ui/SubmitButton";

const EditArticle = ({
  postData,
  siteId,
  articleId,
}: {
  postData: any;
  siteId: string;
  articleId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [articleContent, setArticleContent] = useState<JSONContent | undefined>(
    undefined
  );

  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const router = useRouter();

  console.log("post data", postData?.articleContent);

  const formMethods = useForm({
    resolver: zodResolver(UpdatePostValidation),
    defaultValues: {
      title: postData?.title || "",
      smallDescription: postData?.smallDescription || "",
      slug: postData?.slug || "",
      image: postData?.image || "",
      articleContent: postData?.articleContent || "",
    },
  });
  const { register, watch, handleSubmit, setValue, reset } = formMethods;

  const title = watch("title");

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    if (!siteId) {
      toast.error("Site ID is missing.");
      return;
    }

    const res = await EditPostActions(data, articleId);

    if (res?.data) {
      toast.success(res?.message);
      router.push(`/dashboard/sites/${siteId}`);
    } else {
      const errorMessage =
        typeof res === "string" ? res : "Something went wrong";
      toast.error(errorMessage);
    }

    console.log("Data being sent to backend:", data.articleContent);
    setLoading(false);
    reset(); // Reset form after submission
  };
  console.log("title", title);

  const handleSlugGeneration = () => {
    if (!title) {
      return toast.error("Please enter a title first");
    }
    const generatedSlug = slugify(title);
    setValue("slug", generatedSlug);
    toast.success("Slug has been created");
  };
  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 mb-4">
                <InputFeild
                  name="title"
                  placeholder="Enter post title"
                  label="Title"
                />

                <div className="grid gap-2">
                  <InputFeild
                    name="slug"
                    placeholder="Enter slug"
                    label="Slug"
                  />
                  <Button
                    onClick={handleSlugGeneration}
                    className="w-fit"
                    variant="secondary"
                    type="button"
                  >
                    <Atom className="size-4 mr-2" /> Generate Slug
                  </Button>
                </div>
                <TextareaField
                  name="smallDescription"
                  placeholder="Enter smalll description"
                  label="Small Description"
                />
                <div className="grid mb-2">
                  <label
                    className={`font-medium text-gray-700 text-sm
              }`}
                  >
                    Cover Image
                  </label>
                  <Controller
                    name="image"
                    control={formMethods.control}
                    defaultValue={postData?.image}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt="Uploaded Image"
                            className="object-cover w-[200px] h-[200px] rounded-lg"
                            width={200}
                            height={200}
                          />
                        ) : (
                          <UploadDropzone
                            onClientUploadComplete={(res) => {
                              const imageUrl = res[0].url;
                              setImageUrl(imageUrl);
                              field.onChange(imageUrl);
                              toast.success("Image has been uploaded");
                            }}
                            endpoint="imageUploader"
                            className="cursor-pointer"
                            onUploadError={() => {
                              toast.error("Something went wrong...");
                            }}
                          />
                        )}
                        {error && (
                          <p className="mt-2 text-sm text-red-600">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className={`font-medium text-gray-700 text-sm
              }`}
                  >
                    Article Content
                  </label>
                  <Controller
                    name="articleContent"
                    control={formMethods.control}
                    defaultValue={postData?.articleContent}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <TailwindEditor
                          onChange={(content) =>
                            field.onChange(JSON.stringify(content))
                          }
                          initialValue={postData?.articleContent}
                        />
                        {error && (
                          <p className="mt-2 text-sm text-red-600">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="flex justify-center">
                  <SubmitButton
                    text="Edit Article"
                    className="mt-4"
                    loading={loading}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
};

export default EditArticle;
