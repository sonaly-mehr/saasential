'use client';
import { getPostsBySlug } from "@/app/actions/post.action";
import { RenderArticle } from "@/components/layout/RenderArticle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import React, { use, useEffect, useState } from "react";

type PostData = {
  articleContent: any;
  title: string;
  smallDescription: string;
  image: string;
  createdAt: Date;
};

const page = ({
  params,
}: {
  params: Promise<{ slug: string; name: string }>;
}) => {
  const { slug, name } = use(params);
  const [data, setData] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPostsBySlug(slug);
      setData(result as any);
    };
    fetchData();
  }, [slug]);

  if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className="flex items-center gap-x-3 pt-10 pb-5">
        <Button size="icon" variant="outline" asChild>
          <Link href={`/blog/${name}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-medium">Go Back</h1>
      </div>

      <div className="flex flex-col items-center justify-center mb-10">
        <div className="m-auto w-full text-center md:w-7/12"></div>
        <p className="my-5 w-10/12 text-sm font-light text-muted-foreground md:text-base">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
          }).format(data?.createdAt)}
        </p>
        <h2 className="mb-5 w-10/12 text-2xl font-bold md:text-5xl tracking-tight">
            {data.title}
          </h2>
          <p className=" w-10/12 text-muted-foreground line-clamp-3">
            {data.smallDescription}
          </p>
      </div>

      <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-[450px] md:w-5/6 md:rounded-2xl lg:w-2/3">
        <Image
          src={data?.image}
          alt={data?.title}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <RenderArticle json={data?.articleContent as JSONContent}/>
    </>
  );
};

export default page;
