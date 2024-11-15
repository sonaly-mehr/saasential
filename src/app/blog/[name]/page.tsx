'use client'
import { getPostsBySubdirectory } from "@/app/actions/site.action";
import Image from "next/image";
import React, { Suspense, use, useEffect, useState } from "react";
import Logo from "../../../../public/assets/images/logo.png";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DefaultImg from "../../../../public/assets/images/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/EmpyState";

// Refactored to not use `use()`
type Post = {
    id: string;
    title: string;
    smallDescription: string;
    image: string | null;
    createdAt: string;
    slug: string;
  };
  
  type BlogData = {
    id: string
    name: string;
    posts: Post[];
  };

const Blog = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = use(params);
  const [data, setData] = useState<BlogData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPostsBySubdirectory(name);
      setData(result as any);
    };
    fetchData();
  }, [name]);

  if (!data) return <div>Loading...</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav className="grid grid-cols-3 my-10">
        <div className="col-span-1" />
        <div className="flex items-center gap-x-4 justify-center">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <h1 className="text-3xl font-semibold tracking-tight">{data?.name}</h1>
        </div>
        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggle />
        </div>
      </nav>

      {data?.posts === undefined || data?.posts?.length === 0 ? (
        <EmptyState
          title="You don't have any articles created for this blog"
          description="You currently don't have any posts. Please create some so you can see them here!"
          buttonText="Create Post"
          href={`/dashboard/sites/${data?.id}/create`}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {data?.posts?.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between h-full">
              <Image
                src={item.image ?? DefaultImg}
                alt={item.title}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader className="flex-1">
                <CardTitle className="truncate">{item.title}</CardTitle>
                <CardDescription className="line-clamp-3">{item.smallDescription}</CardDescription>
              </CardHeader>

              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/blog/${name}/${item.slug}`}>Read more</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Suspense>
  );
};

export default Blog;