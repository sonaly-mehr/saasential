import { getSinglePostData } from "@/app/actions/post.action";
import EditArticle from "@/components/layout/Form/EditArticlePost";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({
  params,
}: {
  params: { articleId: string; siteId: string };
}) => {
  const { articleId, siteId } = params;

  const postData = await getSinglePostData(articleId);
  console.log("single post data", postData);

  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" asChild className="mr-3">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
      </div>

      <EditArticle postData={postData} siteId={siteId} articleId={articleId} />
    </div>
  );
};

export default page;
